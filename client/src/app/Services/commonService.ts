import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public sortType = new Subject<String>();
  public totalEarned = new Subject<Number>();
  public totalProjects = new Subject<Number>();
  public User = new Subject<User>();
  user: User;
  constructor() { 

  }

  getUser(): User{
    return this.user;
  }

  setUser(user: User){
    this.User.next(user);
    this.user = user;
  }

  setTotalProjects(total: Number){
    this.totalProjects.next(total);
  }

  setTotalEarning(earning: Number){
    this.totalEarned.next(earning);
  }

  setSortType(key: String){
    this.sortType.next(key);
  }
}
