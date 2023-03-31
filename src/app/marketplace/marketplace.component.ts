import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceService } from '../_services/marketplace.service';
import { StorageService } from '../_services/storage.service';
import { MarketPlace } from '../models/Marketplace.model';


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {

  constructor(private marketplaceService: MarketplaceService, private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router) { }

    marketplaces?: MarketPlace[];
    currentMarketplace: MarketPlace = {};
    currentIndex = -1;
    university = '';
    currentUser: any;
    href: string = "";
    isAll = true;
   
    ngOnInit(): void {
 
      this.href = this.router.url;
      this.currentUser = this.storageService.getUser();
      this.retrieveAll();
    }

    retrieveAll(): void {
      this.marketplaceService.getAll()
        .subscribe({
          next: (data) => {
            this.marketplaces= data;
            //console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
  
    searchUniversity(): void {
      this.currentMarketplace = {};
      this.currentIndex = -1;
  
      this.marketplaceService.findByUniversity(this.university)
        .subscribe({
          next: (data) => {
            this.marketplaces = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }


    removeMarketplace(marketplace: any): void {
     
      this.marketplaceService.delete(marketplace.id)
        .subscribe({
          next: (data) => {
            this.marketplaces= data;
            //console.log(data);
            window.location.reload();
          },
          error: (e) => console.error(e)
        });
      }
  
}
