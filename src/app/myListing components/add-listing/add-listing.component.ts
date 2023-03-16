import { Component } from '@angular/core';
import { Listing } from 'src/app/models/Listing.model';
import { ListingService } from 'src/app/services/listing.service';
import { StorageService } from '../../_services/storage.service';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent {

  currentUser: any;

  data = new FormData();

  listing: Listing = {
    address: '',
    university: '',
    semester: '',
    rent: '',
    image: '',
  };
  submitted = false;

  constructor(private listingService: ListingService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  saveListing(): void {
    const data = {
      address: this.listing.address,
      university: this.listing.university,
      semester: this.listing.semester,
      rent: this.listing.rent,
      userid: this.currentUser.id,
      image: this.listing.image,
    };
    

    this.listingService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newListing(): void {
    this.submitted = false;
    this.listing = {
      address: '',
      university: '',
      semester: '',
      rent: '',
    };
  }

  upload(event: any) {
    const file = event.target.files[0];

    
    this.data.append('file', file);


    this.listingService.fileUpload(this.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listing.image = res.filename;
          //this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

}