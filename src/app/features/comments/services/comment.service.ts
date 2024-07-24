import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateCommentDto } from '../models/create-comment-dto';
import { Observable } from 'rxjs';
import { GetCommentsByUserId } from '../models/get-comments-by-userId.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly controllerUrl = `${environment.apiUrl}/comments`;

  constructor(private httpClient: HttpClient) { }

  createComment(comment: CreateCommentDto): Observable<void> {
    return this.httpClient.post<void>(this.controllerUrl, comment);
  }

  getCommentsBelongUser(userId: number): Observable<GetCommentsByUserId[]>{
    const url =  `${this.controllerUrl}/user/${userId}`; 
    return this.httpClient.get<GetCommentsByUserId[]>(url);
  }
  
  deleteComment(id: number, userId: number): Observable<any> {
    const url =  `${this.controllerUrl}/${id}/user/${userId}`; 
    return this.httpClient.delete(url, { responseType: 'text' });
  }

}
