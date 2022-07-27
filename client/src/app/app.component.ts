import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './User';
import { APIService } from './Services/apiService';
import { CommonService } from './Services/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'freelancing-accounting';
  user: User;

  constructor(private router: Router, private apiService: APIService, private commonService: CommonService){

  }

  checkCookie(): boolean{
    console.log(document.cookie)
    let cookie = document.cookie.split(';')
    let username = ""; 
    let password = "";
    for (let c of cookie){
      let val = c.split('=');
      if (val[0].trim() == 'username'){
        username = val[1].trim();
      }else if(val[0].trim() == 'password'){
        password = val[1].trim();
      }
    }
    console.log(username, password);
    if (username && password){
      let user = {
        username: username,
        password: password
      }
      this.apiService.signIn(user).subscribe(d => {
        this.commonService.setUser(d);
        this.user = user;
        this.router.navigate(['/'])
        return true
      }, error => {
        return false
      })
    }
    return false;
  }

  ngOnInit(): void{
    if (!this.checkCookie()){
      this.router.navigate(['/signIn'])
    }
  }

}
