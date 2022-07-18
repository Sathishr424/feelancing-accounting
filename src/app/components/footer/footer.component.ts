import { Component, OnInit } from '@angular/core';
import { SortServiceService } from 'src/app/Services/sort-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  earning: Number = 0;
  total: Number = 0;
  constructor(private service: SortServiceService) { }

  ngOnInit(): void {
    this.service.totalEarned.subscribe(e => {
      this.earning = e;
    })
    this.service.totalProjects.subscribe(t => {
      this.total = t;
    })
  }

}
