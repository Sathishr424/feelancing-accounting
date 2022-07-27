import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/apiService';
import { CommonService } from 'src/app/Services/commonService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signIn: boolean = true;
  username: string = "";
  password: string = "";
  c_password: string = "";
  errors: string;

  constructor(private apiService: APIService, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {

  }

  toggleSignIn(){
    this.signIn = !this.signIn;
    this.errors = "";
  }

  submit(){
    this.errors = "";
    if (this.username.length < 3) this.errors += "Username length must be larger than 3 characters &\n"
    if (this.password.length < 5) this.errors += "Password length must be 5 or more characters &\n"
    if (!this.signIn){
      if (this.password.length >= 5 && this.c_password != this.password){
        this.errors += "Password and confirm password not matching &\n"
      }
    }
    if (this.errors && this.errors.length > 0) this.errors = this.errors.substring(0,this.errors.length-2) + "!!";
    else{
      let user = {
        username: this.username,
        password: this.password
      }
      if (this.signIn) {
        this.apiService.signIn(user).subscribe(d => {
          this.commonService.setUser(d);
          document.cookie = `username=${this.username}; sameSite=None; Secure`;
          document.cookie = `password=${this.password}; sameSite=None; Secure`;
          this.router.navigate(['/']);
        }, error => {
          console.log(error)
          this.errors = error.error.error.toString();
        })
      }else{
        this.apiService.signUp(user).subscribe(d => {
          this.commonService.setUser(d);
          document.cookie = `username=${this.username}; sameSite=None; Secure`;
          document.cookie = `password=${this.password}; sameSite=None; Secure`;
          this.router.navigate(['/']);
        }, error => {
          console.log(error)
          this.errors = error.error.error.toString();
        })
      }
    }
  }

}
