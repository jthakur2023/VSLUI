
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/Item.model';
import { StorageService } from '../_services/storage.service';
import { ListingService } from '../_services/listing.service';

@Component({
  selector: 'app-listing-item-create',
  templateUrl: './listing-item-create.component.html',
  styleUrls: ['./listing-item-create.component.css']
})


export class ListingItemCreateComponent {
  currentUser: any;

  data = new FormData();

  listingId= "";

  marketplace: Item = {
    image: '',
    title: '',
    description: '',
    price: '',
    condition: '',
  };
  submitted = false;

  constructor(private listingService: ListingService, 
              private storageService: StorageService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.listingId = this.route.snapshot.params["id"];
  }

  saveItem(): void {
    const data = {
      image: this.marketplace.image,
      title:this.marketplace.title,
      description: this.marketplace.description,
      price: this.marketplace.price,
      condition: this.marketplace.condition,
      listingid: this.listingId,
    };
    

    this.listingService.createItem(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          window.location.replace('/details/'+this.listingId);
        },
        error: (e) => console.error(e)
      });
  }

  newItem(): void {
    this.submitted = false;
    this.marketplace = {
      image: '',
      title: '',
      description: '',
      price: '',
      condition: '',
    };
  }

  upload(event: any) {
    const file = event.target.files[0];

    
    this.data.append('file', file);


    this.listingService.fileUpload(this.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.marketplace.image = res.filename;
          //this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

}
