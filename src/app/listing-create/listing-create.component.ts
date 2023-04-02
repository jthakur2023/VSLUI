import { Component } from '@angular/core';
import { Listing } from '../models/Listing.model';
import { ListingService } from '../_services/listing.service';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-listing-create',
  templateUrl: './listing-create.component.html',
  styleUrls: ['./listing-create.component.css']
})
export class ListingCreateComponent {

  currentUser: any;
  typeahead: FormControl = new FormControl();

  data = new FormData();

  listing: Listing = {
    address: '',
    university: '',
    semester: '',
    rent: '',
    image: '',
    image2: '',
    image3: '',
    laundry:'',
    gym:'',
    pool:'',
    parking:'',
    type:'',
    sublease:'',
    phoneNumber:'',
    email:'',
    personalNote:'',
    wifi:''
  };
  submitted = false;
  uni: any;
  uniNames: any [] = [];
  universityList: any [] =[];
  suggestions: string[] = [];


  constructor(private listingService: ListingService, private storageService: StorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  suggest(){
    this.suggestions = this.universityList
    .filter(c => c.startsWith(this.typeahead.value))
    .slice(0, 5);
  }

  saveListing(): void {
    const data = {
      address: this.listing.address,
      university: this.listing.university,
      semester: this.listing.semester,
      rent: this.listing.rent,
      laundry: this.listing.laundry,
      gym: this.listing.gym,
      pool: this.listing.pool,
      parking: this.listing.parking,
      type: this.listing.type,
      sublease: this.listing.sublease,
      phoneNumber: this.listing.phoneNumber,
      email: this.listing.email,
      personalNote: this.listing.personalNote,
      wifi: this.listing.wifi,
  
      userid: this.currentUser.id,
      image: this.listing.image,
      image2: this.listing.image2,
      image3: this.listing.image3,
    };
    

    this.listingService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          window.location.replace('/listings');
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
    this.data.set('file', file);
    this.listingService.fileUpload(this.data)
      .subscribe({
        next: (res) => {
          this.listing.image = res.filename;
        },
        error: (e) => console.error(e)
      });
  }

  upload2(event: any) {
    const file = event.target.files[0];
    this.data.set('file', file);
    this.listingService.fileUpload(this.data)
      .subscribe({
        next: (res) => {
          this.listing.image2 = res.filename;
        },
        error: (e) => console.error(e)
      });
  }

  upload3(event: any) {
    const file = event.target.files[0];
    this.data.set('file', file);
    this.listingService.fileUpload(this.data)
      .subscribe({
        next: (res) => {
          this.listing.image3 = res.filename;
        },
        error: (e) => console.error(e)
      });
  }

}
