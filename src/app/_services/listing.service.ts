import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/Listing.model';

const baseUrl = 'http://localhost:8080/api/listings';

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

  fileUpload(data:FormData): Observable<any> {
    return this.http.post(`${baseUrl}/upload`, data);
  }
}