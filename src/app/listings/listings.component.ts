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
    public route: ActivatedRoute,
    public router: Router) { }
  
  listings?: Listing[];
  
  currentListing: Listing = {};
  currentIndex = -1;
  university = '';
  semester = '';
  type = '';
  currentUser: any;
  href: string = "";
  isFavorite = false;
  isAll = false;

  ngOnInit(): void {
 
    this.href = this.router.url;
    this.currentUser = this.storageService.getUser();

    if (this.href.indexOf('/user') != -1) {
      this.retrieveListingsByUser();
      this.isAll = false;
      this.isFavorite = false;
     
    } else if (this.href.indexOf('/favorites') != -1) {
      this.retrieveFavorites();
      this.isAll = false;
      this.isFavorite = true;
   
    } else {
      this.retrieveAllListings();
      
      this.isAll = true;
    }
  }

  retrieveListingsByUser(): void {
    this.listingService.listingByUser(this.currentUser.id)
      .subscribe({
        next: (data) => {
          this.listings = data;
          if(this.listings[0].views > 0){
          }
        },
        error: (e) => console.error(e)
      });
  }

  retrieveFavorites(): void {
    this.listingService.listingFavorites(this.currentUser.id)
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
    this.findByFiler();

    // this.listingService.findByUniversity(this.university)
    //   .subscribe({
    //     next: (data) => {
    //       this.listings = data;
    //       console.log(data);
    //     },
    //     error: (e) => console.error(e)
    //   });
  }

 
  findByFiler(): void {
    this.currentListing = {};
    this.currentIndex = -1;
    var qp = ''; 
    if (this.university.length>1) {
       qp += "university="+this.university +"&";
    }
    if (this.semester.length>1) {
      qp += "semester="+this.semester+"&";
    } 
    if (this.type.length>1) {
      qp += "type="+this.type+"&";
    }
    if (qp.endsWith("&")) {
      qp=qp.substring(0,qp.length-1);
    }

    this.listingService.findByFilter(qp)
      .subscribe({
        next: (data) => {
          this.listings = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

 
  getSemesterValue(value : string) : void{
    this.semester = value;
    //this.searchSemester();
    this.findByFiler()
  }

  searchSemester(): void {
    this.currentListing = {};
    this.currentIndex = -1;
    

    this.listingService.findBySemester(this.semester)
      .subscribe({
        next: (data) => {
          this.listings = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getTypeValue(value : string) : void{
    this.type = value;
    //this.searchType();
    this.findByFiler();
  }

  searchType(): void {
    this.currentListing = {};
    this.currentIndex = -1;
    

    this.listingService.findByType(this.type)
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

  saveFavorite(listing: any): void {
    const aData = {userid:'', listingid:''};
    aData.userid = this.currentUser.id;
    aData.listingid = listing.id;

    this.listingService.createFavorite(aData)
      .subscribe({
        next: (data) => {
          this.listings= data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  
  }

  removeFavorite(listing: any): void {
    const aData = {userid:'', listingid:''};
    aData.userid = this.currentUser.id;
    aData.listingid = listing.id;

    this.listingService.deleteFavorite(aData)
      .subscribe({
        next: (data) => {
          this.listings= data;
          console.log(data);
          window.location.reload();
        },
        error: (e) => console.error(e)
      });

  
  }

}

