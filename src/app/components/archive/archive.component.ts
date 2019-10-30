import { Component, OnInit, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {Note} from '../../models/note.model';
import {DataService} from 'src/app/services/dataService/data.service';
import {MatDialog} from '@angular/material';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  notes : Note;
  options : any;
  message : string;
  archiveData :  any;
  component = "archive";

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
    this.svc.archivedNotesList().subscribe((response : any) =>
    {
      this.notes = response.data.data.reverse();
      this.archiveData = this.filterData(this.notes);
    },(error)=>{
      console.log(error);
    });
  }
  
  filterData(data)
  {
    var result = data.filter(function(note)
    {
      return (note.isArchived == true && note.isDeleted == false);
    })
    return result;
  }
  
receiveMessage($event)
{
this.message = $event;
this.getNoteData();
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
          recycle : false
        }
      });
    dialogref.afterClosed().subscribe(result=> {
      console.log("dialog result ", result);
    })
  }
}
