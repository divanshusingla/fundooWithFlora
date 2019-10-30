import { Component, OnInit, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {Note} from '../../models/note.model';
import {DataService} from 'src/app/services/dataService/data.service';
import {MatDialog} from '@angular/material';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
@Component({
  selector: 'app-note-main',
  templateUrl: './note-main.component.html',
  styleUrls: ['./note-main.component.scss']
})
export class NoteMainComponent implements OnInit {
  notes : Note;
  allNotes : any;
  component = "mainnotes";
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
      this.allNotes = this.notes;
    },(error)=>{
      console.log(error);
    });
  }
    
  filterData(data)
  {
    var result = data.filter(function(note)
    {
      return (note.isArchived == false && note.isDeleted == false );
    })
    return result;
  }

}
