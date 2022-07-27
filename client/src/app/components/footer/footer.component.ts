import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/commonService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  earning: Number = 0;
  total: Number = 0;
  constructor(private commonService: CommonService, private router: Router) { }

  getRouterUrl(): String{
    return this.router.url;
  }

  ngOnInit(): void {
    this.commonService.totalEarned.subscribe(e => {
      this.earning = e;
    })
    this.commonService.totalProjects.subscribe(t => {
      this.total = t;
    })
  }

}
