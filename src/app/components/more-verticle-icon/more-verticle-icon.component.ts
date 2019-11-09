import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-more-verticle-icon',
  templateUrl: './more-verticle-icon.component.html',
  styleUrls: ['./more-verticle-icon.component.scss']
})
export class MoreVerticleIconComponent implements OnInit {
  @Input() noteid: any;
  @Input() mat: any;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() labelEvent = new EventEmitter<any>();
  result: any;
  labels: any;
  message: any;
  response: any;
  labelObj: any;
  show : any = false;
  constructor(@Inject(MatSnackBar) private _snackBar: MatSnackBar,@Inject(Router)private router : Router,@Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) private dataSvc: DataService) { }

  ngOnInit() {
    this.getLabelList();
  }


  toggleShow(noteid)
  {
    this.show = !this.show;
    let data = {
      show : this.show,
      noteId : noteid,
    }
    this.dataSvc.changeCheckbox(data);
    // console.log("more vertical checkbox -------------------->>>>>>>>>>>>> ",data);
   
  }


  trashNotes(id) {
    let trash =
    {
      isDeleted: true,
      noteIdList: [id]
    }
    this.result = this.svc.trashNotes(trash)
    this.result.subscribe((response) => {
      this.response = response;
      // console.log("the result is ", this.response);
    });
    this.dataSvc.changeMessage("note is trashed");
  }

  restoreNote(noteid) {
    let restore =
    {
      isDeleted: false,
      noteIdList: [noteid]
    }
    this.result = this.svc.trashNotes(restore)
    this.result.subscribe((response) => {
      this.response = response;
      // console.log("the result is ", this.response);
    });
    this.openSnackBar('note is restored',"Close");
    this.dataSvc.changeMessage("note is restored");
  }

  deleteForever(noteid) {
    let delFor =
    {
      isDeleted: true,
      noteIdList: [noteid]
    }
    this.result = this.svc.deleteForever(delFor)
    this.result.subscribe((response) => {
      this.response = response;
      // console.log("the result is ", this.response);
    });
    this.openSnackBar('note is forever deleted',"Close");
    this.dataSvc.changeMessage("note is deleted forever ");
  }



  addLabels(labeldata,id,nId) {
    if(nId)
    {    console.log("note", this.noteid)
    this.labelObj = {
      labelId: id,
      noteId: nId,
    }
    this.svc.addLabelToNotes(this.labelObj).subscribe((response) => {
      // console.log(response);
      this.response = response;
      this.messageEvent.emit(this.message);
      console.log("messag from kabel===>>>>>>>>>>>",this.response);
    });
    this.dataSvc.changeMessage("add label function is executed");
  }

  else{
    let labelObj = 
    {
      label : labeldata,
      labelId: id,
    }
    console.log("event is emitter d",labelObj);
    // this.dataSvc.addLabel(labelObj);
    this.labelEvent.emit(labelObj);
  }
  }

  getLabelList() {
    this.result = this.svc.getNoteLabelList()
    this.result.subscribe((response) => {
      this.response = response;
      this.labels = this.response.data.details.reverse();
      // console.log("the result is in get list", this.response);
    });
  }




  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
