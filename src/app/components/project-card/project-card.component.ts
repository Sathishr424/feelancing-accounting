import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import {Project} from '../../Project'
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Output() onDelete: EventEmitter<Project> = new EventEmitter();
  constructor(private projectService:ProjectServiceService, private router: Router) { 
  }

  convertCurrency(price: string){
    // return '$' + Math.round((parseFloat(price)/79) * 100) / 100
    return '$' + parseFloat(price).toFixed(2)
  }

  ngOnInit(): void {
    // console.log(this.project)
    this.project.start_date = new Date(parseFloat(this.project.start_date)).toDateString().substring(4);
    this.project.end_date = new Date(parseFloat(this.project.end_date)).toDateString().substring(4);
  }

  editProject(){
    this.router.navigate(['/add_project'], {state: {edit: true, id:this.project.id}});
  }

  deleteProject(){
    this.onDelete.emit(this.project);
  }

}
