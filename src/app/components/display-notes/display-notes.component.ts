import { Component, OnInit, Inject, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {Note} from '../../models/note.model';
import {DataService} from 'src/app/services/dataService/data.service';
import {MatDialog} from '@angular/material';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
@Input()  display : any;
@Input() component : any;
notes : Note;
options : any;
message : String;
archivevalue = 'true';
view : any;
  constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService,@Inject(MatDialog) private dialog : MatDialog) { }

  ngOnInit() {
    this.dataSvc.currentView.subscribe((res) => {
      if(res == 'default view')
      {
        this.view = "grid";
      }
      else{
     this.view = res;}
    });
    this.display;
 
  }

receiveMessage($event)
{
this.message = $event;
// this.getNoteData();
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
        color : note.color,
        component : this.component,
      }
    });
  dialogref.afterClosed().subscribe(result=> {
    console.log("dialog result ", result);
  })
  // console.log('asdasdasdasd',this.display); 
}



deletelabelfromnotes(label, noteid) {
  let data = {
    id: label,
    noteId: noteid
  }
  //console.log("label value.......", data);
  this.svc.deleteLabelFromNotes(data).subscribe((response: any) => {
    this.dataSvc.changeMessage(response);
    //console.log(response);
  });
}

deleteReminderFromNotes(noteid,reminder)
{
  let data = 
  {
    noteIdList : [noteid],
    reminder : reminder
  }
  this.svc.deleteReminderFromNotes(data).subscribe((response: any) => {
    this.dataSvc.changeMessage(response);
    //console.log(response);
  });
}

}
