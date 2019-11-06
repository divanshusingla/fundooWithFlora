import { Component, OnInit } from '@angular/core';
import { Forgot } from '../../models/forgot.model';
import { FormControl, Validators } from '@angular/forms';
import {UserServiceService} from '../../services/userService/user-service.service'
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  response: any;
  result: any;
  userObj: Forgot = new Forgot();

  constructor(@Inject(MatSnackBar) private _snackBar: MatSnackBar,@Inject(UserServiceService) private svc: UserServiceService) { };
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
    }
    this.result = this.svc.forgotPassword(this.userObj);
      this.result.subscribe((response) => {
        this.response = response;
        this.openSnackBar('Reset link send to the email. Please check. ',"Close");
        console.log(this.response);
      },(error)=>{
        this.openSnackBar('Email entered is wrong',"Close");
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
