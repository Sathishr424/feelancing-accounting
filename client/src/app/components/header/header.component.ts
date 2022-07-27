import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Project';
import { CommonService } from 'src/app/Services/commonService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router, private commonService: CommonService) { }
  total: Number = 0;

  ngOnInit(): void {
    this.commonService.totalProjects.subscribe(e => {
      this.total = e;
    })
  }

  logout(): void{
    document.cookie = 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'password=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate(['/signIn'])
  }

  getRouter(): Router{
    return this.router;
  }

  onPageChange(route: String){
    return this.router.url == route
  }

  sortChange(key: String){
    this.commonService.setSortType(key);
  }
}
