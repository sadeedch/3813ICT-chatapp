import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService, User } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  username_input: any;
  error: any;


  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  login_click(){
     this.loginService.login(this.username_input).subscribe(data => {
       if(data.valid === true){
        localStorage.setItem('username', JSON.stringify(data.username));
        localStorage.setItem('role', JSON.stringify(data.role));
        localStorage.setItem('groupAdminRole', JSON.stringify(data.groupAdminRole))
        this.router.navigateByUrl("/home")

       } else {
         this.error = "Invalid Username"
       }
     }

     )
     }
}
