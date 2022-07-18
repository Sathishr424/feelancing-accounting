import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectServiceService } from 'src/app/Services/project-service.service';

import { Project } from '../../Project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter();
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  earned: Number;
  completed: boolean;
  editing: boolean = false;
  id: Number;
  constructor(private projectService:ProjectServiceService, private router:Router) { 
    // console.log(this.router.getCurrentNavigation()?.extras.state)
    let params = this.router.getCurrentNavigation()?.extras.state
    if (params){
      this.editing = params['edit'];
      if (this.editing){
        this.id = params['id'];
        this.projectService.getProject(params['id']).subscribe(p => {
          var s_date = new Date(parseInt(p.start_date));
          var e_date = new Date(parseInt(p.end_date));
          this.title = p.title;
          this.start_date = `${s_date.getFullYear()}-${((s_date.getMonth()+1) < 10 ? '0' : '') + (s_date.getMonth()+1)}-${(s_date.getDate() < 10 ? '0' : '') + s_date.getDate()}`;
          this.end_date = `${e_date.getFullYear()}-${((e_date.getMonth()+1) < 10 ? '0' : '') + (e_date.getMonth()+1)}-${(e_date.getDate() < 10 ? '0' : '') + e_date.getDate()}`;
          this.description = p.description;
          this.earned = p.budget;
          this.completed = p.status;
        })
      }
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    // console.log(this.start_date);
    // console.log(this.end_date)
    // this.onAddProject.emit(project);
    if (this.editing){
      let project = {
        id: this.id,
        title: this.title,
        start_date: new Date(this.start_date).getTime().toString(),
        end_date: new Date(this.end_date).getTime().toString(),
        description: this.description,
        cover: "project-icon.png",
        status: this.completed,
        budget: this.earned
      };
      this.projectService.updateProject(project).subscribe(p => {
        this.router.navigate(['/'])
      })

    }else{
      let project = {
        title: this.title,
        start_date: new Date(this.start_date).getTime().toString(),
        end_date: new Date(this.end_date).getTime().toString(),
        description: this.description,
        cover: "project-icon.png",
        status: this.completed,
        budget: this.earned
      };
      this.projectService.addProject(project).subscribe(p => {
        this.router.navigate(['/'])
      })
    }
  }
}
