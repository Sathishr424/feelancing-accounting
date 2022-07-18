import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Project';
import { SortServiceService } from 'src/app/Services/sort-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router, private sortService: SortServiceService) { }

  ngOnInit(): void {
  }

  getRouter(): Router{
    return this.router;
  }

  onPageChange(route: String){
    return this.router.url == route
  }

  sortChange(key: String){
    this.sortService.setSortType(key);
  }
}
