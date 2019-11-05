import { Component, OnInit } from '@angular/core';
import { User } from '../../models/register.model';
import { FormControl, Validators } from '@angular/forms';
import {UserServiceService} from '../../services/userService/user-service.service'
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  response: any;
  result: any;
  userObj: User = new User();
  pack: string;


  constructor(@Inject(UserServiceService) private svc: UserServiceService,@Inject(DataService) public dataSvc: DataService) { }
  public firstName = new FormControl('', [Validators.required]);
  public lastName = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.password.value)])

  FirstNameInvalidMessage() {
    if (this.firstName.hasError("required"))
      return "First Name is required"
  }
  LastNameInvalidMessage() {
    if (this.lastName.hasError("required"))
      return "Last Name is required"
  }
  getEmailInvalidMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
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

  ngOnInit() {
    this.dataSvc.currentMessage.subscribe((res: any) => {
      this.pack = res;
    console.log("pack....",this.pack);
    })
  }

  onRegister() {
    this.userObj = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      service: this.pack,
    }

    this.result = this.svc.register(this.userObj);
    this.result.subscribe((response) => {
      this.response = response;
      console.log(this.response);
    })
  }

}

