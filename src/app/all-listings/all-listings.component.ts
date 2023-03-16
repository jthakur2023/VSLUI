import { Component } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { Listing } from 'src/app/models/Listing.model';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.component.html',
  styleUrls: ['./all-listings.component.css']
})
export class AllListingsComponent {

  constructor(private listingService: ListingService) { }
  listings?: Listing[];
  currentListing: Listing = {};
  currentIndex = -1;
  university = '';

  ngOnInit(): void {

    this.retrieveAllListings();
  }

  refreshList(): void {
    this.retrieveAllListings();
    this.currentListing = {};
    this.currentIndex = -1;
  }

  setActiveListing(listing: Listing, index: number): void {
    this.currentListing = listing;
    this.currentIndex = index;
  }

  searchUniversity(): void {
    this.currentListing = {};
    this.currentIndex = -1;

    this.listingService.findByUniversity(this.university)
      .subscribe({
        next: (data) => {
          this.listings = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  retrieveAllListings(): void {
    this.listingService.getAll()
      .subscribe({
        next: (data) => {
          this.listings= data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
