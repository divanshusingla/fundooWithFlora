import { Component, OnInit, Inject } from '@angular/core';
import {UserServiceService} from '../../services/userService/user-service.service'
import { Login } from '../../models/login.model';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthServiceService} from '../../services/authService/auth-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  response: any;
  result: any;
  userObj: Login = new Login();

  constructor(@Inject(UserServiceService)private svc: UserServiceService,@Inject(Router)private router:Router,@Inject(AuthServiceService)private auth: AuthServiceService) { }
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);

  getEmailInvalidMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordInvalidMessage() {
    if (this.password.hasError("required")) {
      return ("Password is required");
    }
  }

  ngOnInit() {
  }


  onLogin() {
    this.userObj = {
      email: this.email.value,
      password: this.password.value,
      service: "basic"
    }
    this.result=this.svc.login(this.userObj)
      this.result.subscribe((response) => {
        this.response = response;
        console.log(this.response);
        localStorage.setItem('email', response.email);   
        localStorage.setItem('name', response.firstName+response.lastName);  
        localStorage.setItem('id',response.id);
        localStorage.setItem('imageUrl', response.imageUrl);
        localStorage.setItem('userId',response.userId);
        this.auth.sendToken(response.id);
        this.router.navigate(['/note']);
      }, (error) =>
      {
        console.log(error);
        
      })
  }

}
