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
import { AddListingComponent } from './myListing components/add-listing/add-listing.component';
import { ListingDetailsComponent } from './myListing components/listing-details/listing-details.component';
import { ListingsListComponent } from './myListing components/listings-list/listings-list.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { AllListingsComponent } from './all-listings/all-listings.component';
import { AllListingsDetailsComponent } from './all-listings-details/all-listings-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AppComponent,
    AddListingComponent,
    ListingDetailsComponent,
    ListingsListComponent,
    AllListingsComponent,
    AllListingsDetailsComponent,
    DashboardComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
