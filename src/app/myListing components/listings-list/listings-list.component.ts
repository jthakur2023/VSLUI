import { Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/models/Listing.model';
import { ListingService } from 'src/app/services/listing.service';
import { StorageService } from '../../_services/storage.service';


@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.css']
})
export class ListingsListComponent implements OnInit {

  listings?: Listing[];
  currentListing: Listing = {};
  currentIndex = -1;
  university = '';

  constructor(private listingService: ListingService, private storageService: StorageService) { }
  currentUser: any;


  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();

    this.retrieveListingsByUser();
  }

  retrieveListingsByUser(): void {
    this.listingService.listingByUser(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.listings= data;
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

  refreshList(): void {
    this.retrieveListingsByUser();
    this.currentListing = {};
    this.currentIndex = -1;
  }

  setActiveListing(listing: Listing, index: number): void {
    this.currentListing = listing;
    this.currentIndex = index;
  }

  removeAllListings(): void {
    this.listingService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
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

}