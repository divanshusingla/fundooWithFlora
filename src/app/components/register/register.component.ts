import { Component, OnInit } from '@angular/core';
import { User } from '../../models/register.model';
import { FormControl, Validators } from '@angular/forms';
import {UserServiceService} from '../../services/userService/user-service.service'
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  response: any;
  result: any;
  userObj: User = new User();
  pack: string ;
  productid : any;
  cartid : any;


  constructor(@Inject(MatSnackBar) private _snackBar: MatSnackBar,@Inject(UserServiceService) private svc: UserServiceService,@Inject(DataService) public dataSvc: DataService) { }
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
      if(res != 'default message')
      {
      this.pack = res;
      }
      else{
        this.pack = 'Basic';
      }
    console.log("pack....",this.pack);
    })
    this.getCartId();
  }

  onRegister() {
    this.userObj = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      service: this.pack,
      cartId : this.cartid,
    }
    console.log("user objkect register component ", this.userObj);
    
    this.result = this.svc.register(this.userObj);
    this.result.subscribe((response) => {
      this.response = response;
      console.log(this.response);
    },(error)=>{
      this.openSnackBar('Entries are wrong',"Close");
    })
  }


openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }



  getCartId(){
    if(this.pack=="basic"){
      this.productid = "5bfe362b53c3df0040d852a7"
    }else{
      this.productid = "5bfe361553c3df0040d852a6"
    }
  
      let data ={
        productId: this.productid
      }
      //console.log("cartid form add to cart",data);
      this.svc.addToCartUserService(data).subscribe((response: any) => {
        this.cartid = response.data.details.id
        console.log(response);
        console.log(this.cartid);
        
      },(error)=>{
        console.log("errorrrrr...",error);
        
      })
    }

  }


