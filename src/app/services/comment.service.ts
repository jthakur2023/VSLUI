import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

const baseUrl = 'http://localhost:8080/api/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(baseUrl);
  }


  getCommentsByListingId(id:any):Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}ByListingId/${id}`);
  }

  getCommentsByUserId(id:any):Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}ByUserId/${id}`);
  }

  get(id: any): Observable<Comment> {
    return this.http.get<Comment>(`${baseUrl}/${id}`);
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

}