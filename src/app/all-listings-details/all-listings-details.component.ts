import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from 'src/app/models/Listing.model';
import { Comment } from '../models/comment.model';


@Component({
  selector: 'app-all-listings-details',
  templateUrl: './all-listings-details.component.html',
  styleUrls: ['./all-listings-details.component.css']
})
export class AllListingsDetailsComponent {

  @Input() viewMode = false;

  @Input() currentListing: Listing = {
    id: '',
    address: '',
    university: '',
    semester: '',
    rent: '',
    views: '',
    image: '',
  };


  // ngOnChanges(changes: SimpleChanges) {
  //   const listingId = this.route.snapshot.params["id"];
  //   if (listingId != undefined) {
  //     this.getListing(listingId);
  //     this.getCommentsByListingId(listingId);
  //     this.updateListingViews(this.currentListing);
  //   } 
  
  // }


  message = '';

  constructor(
    private listingService: ListingService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  comments?: Comment[];
  
  ngOnInit(): void {
    const listingId = this.route.snapshot.params["id"];
    if (listingId != undefined) {
      this.getListing(listingId);
      this.getCommentsByListingId(listingId);
      //this.updateListingViews(this.currentListing);
    } 
    console.log("listingid" + listingId);
  }


  getListing(id: string): void {
    this.listingService.get(id)
      .subscribe({
        next: (data) => {
          this.currentListing = data;
          console.log(data);
          this.updateListingViews(data);
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

  getCommentsByListingId(id: string): void {
    this.commentService.getCommentsByListingId(id)
      .subscribe({
        next: (data) => {
          this.comments = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateListingViews(listing: Listing): void {
    this.message = '';
    const views = parseInt(listing.views);
    if (!isNaN(views)) {
      listing.views = views +1;
    }

    this.listingService.update(listing.id, listing)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Listing was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }


}
