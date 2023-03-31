import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketPlace } from '../models/Marketplace.model';

const baseUrl = 'http://localhost:8080/api/marketplace';
const uploadUrl = 'http://localhost:8080/api/listings/upload';


@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(baseUrl);
  }

  getMarketplaceByUser(id:any):Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(`${baseUrl}/${id}`);
  }

  findByUniversity(university: any): Observable<MarketPlace[]> {
    return this.http.get<MarketPlace[]>(`${baseUrl}?university=${university}`);
  }
  
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  fileUpload(data:FormData): Observable<any> {
    return this.http.post(uploadUrl, data);
  }


}