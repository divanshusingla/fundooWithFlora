import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  isLinear= false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  address = new FormControl('', [Validators.required]);
  cartid: any;
  type: any;

  constructor(@Inject(FormBuilder)  private _formBuilder: FormBuilder,@Inject(UserServiceService) private svc: UserServiceService) { }

  ngOnInit() {

   this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getmycart();
  }
  getmycart(){
    this.svc.myCartUserService().subscribe((response: any) => {
      console.log("hit api...",response);
      this.cartid = response.data[0].id;
      this.type = response.data[0].productId;
       console.log("data list.....",this.type);
    }, (error) => {
      console.log(error);
    });
  }

  placeOrder(){
    let data={
      address: this.address.value,
      cartId: this.cartid
    }
    console.log("data./....",data);
    this.svc.placeOrderUserService(data).subscribe((response: any) => {
      console.log("hit api...",response);   
    }, (error) => {
      console.log(error);
    });
  }

}
