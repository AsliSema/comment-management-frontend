import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllTasksDto } from '../models/get-all-tasks.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly controllerUrl = `${environment.apiUrl}/tasks`;

  constructor(private httpClient: HttpClient) { }

  getAllTasks(): Observable<GetAllTasksDto[]>{
    return this.httpClient.get<GetAllTasksDto[]>(this.controllerUrl)
  }
}
