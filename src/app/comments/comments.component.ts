import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../_services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

import { Listing } from 'src/app/models/Listing.model';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  @Input() viewMode = false;

  @Input() currentListing: Listing = {
    id: '1',
    address: '',
    university: '',
    semester: '',
    rent: '',
  };

  data = new FormData();
  comment: Comment = {
   comment:''
  };
  submitted = false;
  currentUser: any;

  
  message = '';

  constructor(private commentService: CommentService, private storageService: StorageService) { }

  
  ngOnInit(): void {
 
    this.currentUser = this.storageService.getUser();
  }

  saveComment(): void {
    const data = {
      comment:this.comment.comment,
      listingid: this.currentListing.id,
      userid: this.currentUser.id
    };

    this.commentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          window.location.reload();
        },
        error: (e) => console.error(e)
      });
  }
  newComment(): void {
    this.submitted = false;
    this.comment = {
      comment: ''
    };
  }



}
