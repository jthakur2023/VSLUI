import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

// import { AddListingComponent } from './myListing components/add-listing/add-listing.component';
// import { ListingDetailsComponent } from './myListing components/listing-details/listing-details.component';
// import { ListingsListComponent } from './myListing components/listings-list/listings-list.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';

// import { AllListingsComponent } from './all-listings/all-listings.component';
// import { AllListingsDetailsComponent } from './all-listings-details/all-listings-details.component';

//import { DashboardComponent } from './dashboard/dashboard.component';
import { CommentsComponent } from './comments/comments.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingCreateComponent } from './listing-create/listing-create.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { UpdateComponent } from './update/update.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { CreateMarketPlaceComponent } from './create-market-place/create-market-place.component';
import { ListingItemCreateComponent } from './listing-item-create/listing-item-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ListingsComponent,
    ListingCreateComponent,
    ListingDetailComponent,
    CommentsComponent,
    UpdateComponent,
    MarketplaceComponent,
    CreateMarketPlaceComponent,
    ListingItemCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
