import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatDialog } from '@angular/material';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor( @Inject(MatDialog)  public dialog: MatDialog,@Inject(Router)  private router: Router, @Inject(DataService) public dataSvc: DataService) { }

  ngOnInit() {
  }
  // Send(type){
  //   console.log("type........",type);
  //   this.dataSvc.changeMessage(type);
  //   this.router.navigate(["/registration"]);
  // }

  openDialog(choice){
    this.dialog.open(CartDialogComponent, {
    data: {
    type: choice
    }, width: '600px'
    });
    }

}
