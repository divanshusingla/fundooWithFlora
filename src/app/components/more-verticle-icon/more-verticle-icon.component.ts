import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-verticle-icon',
  templateUrl: './more-verticle-icon.component.html',
  styleUrls: ['./more-verticle-icon.component.scss']
})
export class MoreVerticleIconComponent implements OnInit {
  @Input() noteid: any;
  @Input() mat: any;
  @Output() messageEvent = new EventEmitter<string>();
  result: any;
  labels: any;
  message: any;
  response: any;
  labelObj: any;
  constructor(@Inject(Router)private router : Router,@Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) private dataSvc: DataService) { }

  ngOnInit() {
    this.getLabelList();
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
    this.dataSvc.changeMessage("note is deleted forever ");
  }



  addLabels(id,nId) {
    console.log("note", this.noteid)
    this.labelObj = {
      labelId: id,
      noteId: nId,
    }
    this.svc.addLabelToNotes(this.labelObj).subscribe((response) => {
      // console.log(response);
      this.response = response;
      this.messageEvent.emit(this.message);
    }, (error) => {
      // console.log(error);
    });
    this.dataSvc.changeMessage("add label function is executed");
  }

  getLabelList() {
    this.result = this.svc.getNoteLabelList()
    this.result.subscribe((response) => {
      this.response = response;
      this.labels = this.response.data.details.reverse();
      // console.log("the result is in get list", this.response);
    });
  }
}
