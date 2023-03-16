import { Component, Input, OnInit } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from 'src/app/models/Listing.model';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentListing: Listing = {
    address: '',
    university: '',
    semester: '',
    rent: '',
  };
  
  message = '';

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getListing(this.route.snapshot.params["id"]);
    }
  }

  getListing(id: string): void {
    this.listingService.get(id)
      .subscribe({
        next: (data) => {
          this.currentListing = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateListing(): void {
    this.message = '';

    this.listingService.update(this.currentListing.id, this.currentListing)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Listing was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteListing(): void {
    this.listingService.delete(this.currentListing.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/Listings']);
        },
        error: (e) => console.error(e)
      });
  }

}