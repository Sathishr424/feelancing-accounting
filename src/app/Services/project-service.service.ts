import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Project } from '../Project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private apiUrl = 'http://localhost:3000/portfolio'
  constructor(private http:HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: Number): Observable<Project>{
    return this.http.get<Project>(this.apiUrl + `/${id}`);
  }

  updateProject(project: Project):Observable<Project>{
    return this.http.put<Project>(this.apiUrl + `/${project.id}`, project, httpOptions);
  }

  addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.apiUrl, project, httpOptions);
  }

  deleteProject(project: Project): Observable<Project>{
    return this.http.delete<Project>(this.apiUrl + `/${project.id}`)
  }
}
