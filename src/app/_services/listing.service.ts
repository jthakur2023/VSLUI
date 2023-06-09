import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/Listing.model';
import { Item } from '../models/Item.model';

const baseUrl = 'http://localhost:8080/api/listings';
const favoritesUrl = 'http://localhost:8080/api/favorites';
const listingItemsUrl = 'http://localhost:8080/api/listing/items';
const locationUrl = 'https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyBJlAx_BO47aYqqJB2tEe1BscKkVBCmDf8';


@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Listing[]> {
    return this.http.get<Listing[]>(baseUrl);
  }


  listingByUser(id:any):Observable<Listing[]> {
    return this.http.get<Listing[]>(`${baseUrl}ByUser/${id}`);
  }

  get(id: any): Observable<Listing> {
    return this.http.get<Listing>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByUniversity(university: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${baseUrl}?university=${university}`);
  }
  findBySemester(semester: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${baseUrl}?semester=${semester}`);
  }
  findByType(type: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${baseUrl}?type=${type}`);
  }

  findByFilter(qp: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${baseUrl}?${qp}`);
  }

  fileUpload(data:FormData): Observable<any> {
    return this.http.post(`${baseUrl}/upload`, data);
  }

  createFavorite(data: any): Observable<any> {
    return this.http.post(favoritesUrl, data);
  }

  listingFavorites(userid:any):Observable<Listing[]> {
    return this.http.get<Listing[]>(`${favoritesUrl}/${userid}`);
  }


  deleteFavorite(data: any): Observable<any> {
    return this.http.post(`${favoritesUrl}/delete`, data);
  }

  // creating items

  createItem(data: any): Observable<any> {
    return this.http.post(listingItemsUrl, data);
  }

  getItemsByListingId(id: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${listingItemsUrl}/${id}`);
  }
  

  addressValidatorService(data: any):Observable<any> {
    return this.http.post(locationUrl, data);
  }

  
}