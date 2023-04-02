import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlace } from '../models/Marketplace.model';
import { StorageService } from '../_services/storage.service';
import { ListingService } from '../_services/listing.service';
import { MarketplaceService } from '../_services/marketplace.service';

@Component({
  selector: 'app-create-market-place',
  templateUrl: './create-market-place.component.html',
  styleUrls: ['./create-market-place.component.css']
})
export class CreateMarketPlaceComponent {
  currentUser: any;

  data = new FormData();

  listingId= "";

  marketplace: MarketPlace = {
    image: '',
    title: '',
    description: '',
    price: '',
    negotiable: '',
    university:'',
    contact:'',
    type:'',
  };
  submitted = false;

  constructor(private marketplaceService: MarketplaceService, 
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
      negotiable: this.marketplace.negotiable,
      university: this.marketplace.university,
      contact: this.marketplace.contact,
      type: this.marketplace.type,
      userid: this.currentUser.id,
    };
    

    this.marketplaceService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          window.location.replace('/marketplace');
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
      negotiable: '',
      university:'',
      contact:'',
      type:'',
    };
  }

  upload(event: any) {
    const file = event.target.files[0];

    
    this.data.append('file', file);


    this.marketplaceService.fileUpload(this.data)
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
