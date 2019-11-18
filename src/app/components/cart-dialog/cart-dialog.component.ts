import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CartComponent } from '../cart/cart.component';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CartComponent>,
    private dataSvc: DataService) { }
    
    ngOnInit() {
    }
    
    Send(type){
    //console.log("type........",type);
    this.dialogRef.close();
    this.dataSvc.changeMessage(type);
    this.router.navigate(["/registration"]);
    }
    
    close() {
    this.dialogRef.close();
    }

}
