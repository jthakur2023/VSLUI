import { Component, Input, OnInit } from '@angular/core';
import { ListingService } from '../_services/listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from 'src/app/models/Listing.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  //@Input() viewMode = false;

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
      //this.message = '';
      this.getListing(this.route.snapshot.params["id"]);
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
          this.router.navigate(['/details', this.currentListing.id]);
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
