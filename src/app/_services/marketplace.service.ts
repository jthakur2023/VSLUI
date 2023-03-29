import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketPlace } from '../models/Marketplace.model';

const baseUrl = 'http://localhost:8080/api/marketplace';
//const favoritesUrl = 'http://localhost:8080/api/favorites';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(baseUrl);
  }

  listingByUser(id:any):Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(`${baseUrl}ByUser/${id}`);
  }

  get(id: any): Observable<MarketPlace> {
    return this.http.get<MarketPlace>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  getItemsByListingId(id:any):Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(`${baseUrl}ByListingId/${id}`);
  }

  getItemsByUserId(id:any):Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(`${baseUrl}ByUserId/${id}`);
  }


  fileUpload(data:FormData): Observable<any> {
    return this.http.post(`${baseUrl}/upload`, data);
  }


}