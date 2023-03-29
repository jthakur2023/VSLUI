import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { ListingsComponent } from './listings/listings.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { ListingCreateComponent } from './listing-create/listing-create.component';
import { UpdateComponent } from './update/update.component';
import { CreateMarketPlaceComponent } from './create-market-place/create-market-place.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'listings', component: ListingsComponent },
  { path: 'listings/user', component: ListingsComponent },
  { path: 'listings/favorites', component: ListingsComponent },
  { path: 'details/:id', component: ListingDetailComponent },
  { path: 'create', component: ListingCreateComponent },
  { path: 'update/:id', component:UpdateComponent},
  { path: 'createItem/:id', component:CreateMarketPlaceComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
