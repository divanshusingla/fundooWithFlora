import { Component, OnInit } from '@angular/core';
import { Forgot } from '../../models/forgot.model';
import { FormControl, Validators } from '@angular/forms';
import {UserServiceService} from '../../services/userService/user-service.service'
import { Inject } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  response: any;
  result: any;
  userObj: Forgot = new Forgot();

  constructor(@Inject(UserServiceService) private svc: UserServiceService) { };
  public email = new FormControl('', [Validators.required]);

  getEmailInvalidMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit() {
  }

  onForgot() {
    this.userObj = {
      email: this.email.value,
      service: "basic"
    }
    this.result = this.svc.forgotPassword(this.userObj);
      this.result.subscribe((response) => {
        this.response = response;
        console.log(this.response);
      })
  }

}
