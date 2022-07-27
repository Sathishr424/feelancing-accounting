import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from 'src/app/Project';
import { APIService } from 'src/app/Services/apiService';
import { CommonService } from 'src/app/Services/commonService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  projects: Project[] = [];
  totalEarning: number = 0;
  constructor(private apiService:APIService, private commonService: CommonService) {
    
  }

  sortProjects(key: String): void{
    let total = 0;
    if (this.projects.length > 0) this.projects.map(p => {
      total += p.budget.valueOf();
    })
    // console.log("Total earned:", total)
    if (this.projects.length > 1){
      if (key == 'budget') {
        if (this.projects[0].budget > this.projects[1].budget){
          this.projects.sort((p1,p2) => p1.budget.valueOf() - p2.budget.valueOf());
        }else{
          this.projects.sort((p1,p2) => p2.budget.valueOf() - p1.budget.valueOf());
        }
      }
      if (key == 'date') {
        if (new Date(this.projects[0].start_date).getTime() > new Date(this.projects[1].start_date).getTime()){
          this.projects.sort((p1,p2) => parseInt(new Date(p1.start_date).getTime().toString()) - parseInt(new Date(p2.start_date).getTime().toString()));
        }
        else this.projects.sort((p1,p2) => parseInt(new Date(p2.start_date).getTime().toString()) - parseInt(new Date(p1.start_date).getTime().toString()));
      }
      if (key == 'status') {
        if (+this.projects[0].status > +this.projects[1].status){
          this.projects.sort((p1,p2) => +p1.status - +p2.status);
        }
        else this.projects.sort((p1,p2) => +p2.status - +p1.status);
      }
    }
  }

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(projects => {
      this.projects = projects;
      // this.projects.map(item => {
      //   console.log(item.start_date);
      //   console.log(new Date(item.start_date));
      // })
      if (this.projects) {
        this.projects.sort((p1,p2) => parseInt(new Date(p1.start_date).getTime().toString()) - parseInt(new Date(p2.start_date).getTime().toString()));
      }
      if (this.projects) this.projects.map(p => {
        this.totalEarning += p.budget.valueOf();
      })
      this.commonService.setTotalEarning(this.totalEarning);
      this.commonService.setTotalProjects(this.projects ? this.projects.length : 0);
    });
    // console.log(this.projects);

    this.commonService.sortType.subscribe( k => {this.sortProjects(k)});
  }

  deleteProject(project: Project){
    this.apiService.deleteProject(project).subscribe(() => {
      this.projects = this.projects.filter(p => p.id != project.id);
    });
  }

}
