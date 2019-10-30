import { Component, OnInit, Inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/services/dataService/data.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  tabs = ['First', 'Second'];
  selected = new FormControl(0);
  
  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<DashboardComponent>, @Inject(DataService) private dataSvc: DataService,@Inject(UserServiceService) private svc: UserServiceService) { }

  ngOnInit() {
  }
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.file;
      //console.log("Cropped Image.........",this.croppedImage);
  }

  uploadimage(){
    const fd = new FormData;
    fd.append('file',this.croppedImage);
    this.close();
    
    this.svc.profileimageuserservice(fd).subscribe((response:any) => {
      localStorage.setItem('imageUrl', response.status.imageUrl);   
      this.dataSvc.changeMessage("changing the image")
      console.log("Image Url while uploading ...",response.status.imageUrl);
    });
   
  }

  close(){
    this.dialogRef.close();
  }
}
