import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { NoteMainComponent } from '../note-main/note-main.component';
import { DataService } from 'src/app/services/dataService/data.service';
import { FormControl } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
result : any;
response : any;
labelName = new FormControl();
updateLabel = new FormControl();
labelDialog: any;
labels :any;
labelModel : any;
constructor(@Inject(MAT_DIALOG_DATA) private data: any, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(MatDialogRef) private dialogRef: MatDialogRef<NoteMainComponent>, @Inject(DataService) private dataSvc: DataService) { }



  ngOnInit() {
    this.getLabelList();
  }

  getLabelList()
  {
    this.result = this.svc.getNoteLabelList()
    this.result.subscribe((response) => {
      this.response = response;
      this.labels = this.response.data.details.reverse();
      console.log("the result is in get list", this.response);
    });
    this.dataSvc.changeMessage(this.labels);
  }

  addLabel() {
    let addLabel =
    {
      label: this.labelName.value,
      isDeleted: false,
      userId: localStorage.getItem('userId')
    }
    this.result = this.svc.addLabel(addLabel)
    this.result.subscribe((response) => {
      this.response = response;
      // this.labelDialog = this.response.label;
      // this.getNoteLabelList();
      // console.log("the result is ", this.response);
    });
    // this.dataSvc.changeMessage("message from dialog");
    // this.dialogRef.close();
    this.getLabelList();
    this.labelModel = " ";
  }


  deleteLabel(label)
  {
    let deleteLabel =
    {
      id : label.id,
    }
    this.result = this.svc.deleteLabel(deleteLabel)
    this.result.subscribe((response) => {
      this.response = response;
      console.log('response',this.response);
    });
    this.getLabelList();
  }

  done()
  {
    this.dialogRef.close();
  }

  updateNoteLabel(label)
  {
    let update = 
    {
      label : this.updateLabel.value,
      id : label.id,
    }
    this.result = this.svc.updateNoteLabel(update)
    this.result.subscribe((response) => {
      this.response = response;
      console.log('response',this.response);
    });
    this.getLabelList();
    this.dialogRef.close();
    }

}
