import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../_services/listing.service';
import { StorageService } from '../_services/storage.service';
import { Listing } from '../models/Listing.model';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent {

  constructor(private listingService: ListingService, private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  listings?: Listing[];
  currentListing: Listing = {};
  currentIndex = -1;
  university = '';
  currentUser: any;
  href: string = "";

  ngOnInit(): void {
    //const mylisting = this.route.snapshot.params["user"];
    this.href = this.router.url;
    if (this.href.indexOf('/user') == -1) {
      this.retrieveAllListings();
    } else {
      this.currentUser = this.storageService.getUser();
      this.retrieveListingsByUser();
    }
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

