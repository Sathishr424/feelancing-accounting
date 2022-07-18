import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from 'src/app/Project';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { SortServiceService } from 'src/app/Services/sort-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  projects: Project[];
  totalEarning: number = 0;
  constructor(private projectService:ProjectServiceService, private sortService: SortServiceService) {
    
  }

  sortProjects(key: String): void{
    let total = 0;
    this.projects.map(p => {
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
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects; 
      this.sortProjects('date');
      this.projects.map(p => {
        this.totalEarning += p.budget.valueOf();
      })
      this.sortService.setTotalEarning(this.totalEarning);
      this.sortService.setTotalProjects(this.projects.length);
    });
    // console.log(this.projects);

    this.sortService.sortType.subscribe( k => {this.sortProjects(k)});
  }

  deleteProject(project: Project){
    this.projectService.deleteProject(project).subscribe(() => {
      this.projects = this.projects.filter(p => p.id != project.id);
    });
  }

}
