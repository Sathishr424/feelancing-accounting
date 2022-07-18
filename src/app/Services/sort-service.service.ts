import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortServiceService {
  public sortType = new Subject<String>();
  public totalEarned = new Subject<Number>();
  public totalProjects = new Subject<Number>();

  constructor() { 

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
