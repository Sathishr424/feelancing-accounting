import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Project } from '../Project';
import { User } from '../User';
import { CommonService } from './commonService';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
}

const preURL = '';
const baseURL = preURL + '/projects';
// console.log(location.origin)
@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = '/projects';
  private signInUrl = preURL + '/signIn';
  private signUpUrl = preURL + '/signUp';
  user: User;
  constructor(private http:HttpClient, private commonService: CommonService) {

    this.commonService.User.subscribe( u => {
      // console.log(u)
      this.user = u;
      this.apiUrl = baseURL + `/${u.id}`;
      // console.log(this.apiUrl)
    })

  }

  signIn(user: User): Observable<User>{
    return this.http.post<User>(this.signInUrl, user, httpOptions)
  }

  signUp(user: User): Observable<User>{
    return this.http.post<User>(this.signUpUrl, user, httpOptions);
  }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: Number): Observable<Project>{
    return this.http.get<Project>(this.apiUrl + `/${id}`);
  }

  updateProject(project: Project):Observable<Project>{
    return this.http.patch<Project>(this.apiUrl + `/${project.id}`, project, httpOptions);
  }

  addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.apiUrl, project, httpOptions);
  }

  deleteProject(project: Project): Observable<Project>{
    return this.http.delete<Project>(this.apiUrl + `/${project.id}`)
  }
}
