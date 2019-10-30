import { Component, OnInit,Inject } from '@angular/core';
import {UserServiceService} from '../../services/userService/user-service.service';
import { Reset } from '../../models/reset.model';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  reponse: any;
  userObj: Reset = new Reset();

  constructor(@Inject(UserServiceService) private svc: UserServiceService, @Inject(ActivatedRoute) private route : ActivatedRoute) { }
  token : string;
  public password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.password.value)]);


  ngOnInit() {
    this.token=this.route.snapshot.paramMap.get('token');
    localStorage.setItem('token',this.token);
  }

  getPasswordInvalidMessage() {
    if (this.password.hasError("required")) {
      return ("Password is required");
    }
    if (this.password.hasError("minlength")) {
      return "Password must be 8 characters"
    }
  }

  ConfirmPasswordInvalidMessage() {
    if (this.confirmPassword.hasError("required")) {
      return "Password is required"
    }
    if (this.confirmPassword.hasError("minlength")) {
      return "Password must be 8 characters"
    }
    if (this.confirmPassword.hasError("pattern")) {
      return "Password did not match"
    }
  }



  onReset() {
    this.userObj = {
      newPassword: this.password.value,
      service: "basic"
    }
    this.svc.resetPassword(this.userObj)
      .subscribe((response) => {
        response = response;
        console.log(response);
      })
  }
}
