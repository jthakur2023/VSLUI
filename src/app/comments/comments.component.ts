import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  message = '';


}
