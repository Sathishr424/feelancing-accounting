import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/apiService';
import { CommonService } from 'src/app/Services/commonService';
import { User } from 'src/app/User';

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
  description: string = "";
  earned: Number = 0;
  completed: boolean = false;
  editing: boolean = false;
  github: string = "";
  tag: string;
  tags: string[] = [];
  id: Number;
  user: User;
  constructor(private apiService:APIService, private router:Router, private commonService: CommonService) { 
    // console.log(this.router.getCurrentNavigation()?.extras.state)
    let params = this.router.getCurrentNavigation()?.extras.state
    if (params){
      this.editing = params['edit'];
      if (this.editing){
        this.id = params['id'];
        this.apiService.getProject(params['id']).subscribe(p => {
          // console.log(p)
          var s_date = new Date(p.start_date);
          var e_date = new Date(p.end_date);
          this.tags = p.tags;
          this.github = p.github;
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
    this.user = this.commonService.getUser();
  }

  tagChange(e: any): void{
    // if (this.tag)
    if (e.substring(e.length-1) == ','){
      this.tags.push(e.substring(0,e.length-1));
      this.tag = '';
    }
  } 

  deleteTag(index: number){
    this.tags.splice(index, 1);
  }

  onSubmit(){
    // console.log(this.start_date);
    // console.log(this.end_date)
    // this.onAddProject.emit(project);
    if (!(this.title && this.start_date && this.end_date)){
      alert("Please fill all the required fields!!");
      return;
    }
    if (this.start_date && this.end_date && new Date(this.start_date).getTime() > new Date(this.end_date).getTime()){
      alert("End date cannot be smaller than start date");
      return;
    }
    if (this.editing){
      let project = {
        id: this.id,
        github: this.github,
        tags: this.tags,
        user_id: this.user.id,
        title: this.title,
        start_date: new Date(this.start_date).getTime().toString(),
        end_date: new Date(this.end_date).getTime().toString(),
        description: this.description,
        cover: "project-icon.png",
        status: this.completed,
        budget: this.earned
      };
      this.apiService.updateProject(project).subscribe(p => {
        this.router.navigate(['/'])
      })

    }else{
      let project = {
        title: this.title,
        user_id: this.user.id,
        github: this.github,
        tags: this.tags,
        start_date: new Date(this.start_date).getTime().toString(),
        end_date: new Date(this.end_date).getTime().toString(),
        description: this.description,
        cover: "project-icon.png",
        status: this.completed,
        budget: this.earned
      };
      this.apiService.addProject(project).subscribe(p => {
        this.router.navigate(['/'])
      })
    }
  }
}
