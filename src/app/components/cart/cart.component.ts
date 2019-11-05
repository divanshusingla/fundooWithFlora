import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(@Inject(Router)  private router: Router, @Inject(DataService) public dataSvc: DataService) { }

  ngOnInit() {
  }
  Send(type){
    console.log("type........",type);
    this.dataSvc.changeMessage(type);
    this.router.navigate(["/registration"]);
  }


}
