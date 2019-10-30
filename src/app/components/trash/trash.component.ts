import { Component, OnInit, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {Note} from '../../models/note.model';
import {DataService} from 'src/app/services/dataService/data.service';
import {MatDialog} from '@angular/material';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes : Note;
  options : any;
  message : String;
  result : any;
  response :any;
  trashNotes : any;
  component = "trash";

    constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService,@Inject(MatDialog) private dialog : MatDialog) { }
    ngOnInit() {
      this.getNoteData();
      this.dataSvc.currentMessage.subscribe((res:any)=>
      {
        this.getNoteData();
      })
    }
  
  getNoteData()
  {

    this.svc.getNotesData().subscribe((response : any) =>
    {
      this.notes = response.data.data.reverse();
      this.notes = this.filterData(this.notes);
      this.trashNotes = this.notes;
    },(error)=>{
      console.log(error);
    });
  }
  
  
  filterData(data)
  {
    var result = data.filter(function(note)
    {
      return (note.isDeleted == true);
    })
    return result;
  }
  
  openDialog(note)
  {
    console.log("the value of note is ", note);
    let dialogref = this.dialog.open(DialogNoteComponent,
      {
        data : {
          title : note.title ,
          description : note.description,
          id : note.id,
          recycle : true
        }
      });
    dialogref.afterClosed().subscribe(result=> {
      console.log("dialog result ", result);
    })
  }

  restoreNote(noteid)
  {
    let restore = 
    {
      isDeleted : false,
      noteIdList : [noteid]
    }
    this.result = this.svc.trashNotes(restore)
    this.result.subscribe((response) => {
      this.response = response;
      console.log("the result is ", this.response);
    });
    this.dataSvc.changeMessage("message from dialog");
  }

  deleteForever(noteid)
  {
    let delFor = 
    {
      isDeleted : true,
      noteIdList : [noteid]
    }
    this.result = this.svc.deleteForever(delFor)
    this.result.subscribe((response) => {
      this.response = response;
      console.log("the result is ", this.response);
    });
    this.dataSvc.changeMessage("message from dialog");
  }
  
}
