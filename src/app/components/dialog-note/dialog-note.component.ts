import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UpdateNote } from '../../models/updateNote.model';
import { NoteServiceService } from '../../services/noteService/note-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteMainComponent } from '../note-main/note-main.component';
import { DataService } from 'src/app/services/dataService/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.scss']
})
export class DialogNoteComponent implements OnInit {
  result: any;
  response: any;
  result1 : any;
  response1 : any;
  noteData : any;
  title = new FormControl();
  description = new FormControl();
  note: UpdateNote = new UpdateNote();
  // labelName = new FormControl();
  // labelDialog: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(MatDialogRef) private dialogRef: MatDialogRef<NoteMainComponent>, @Inject(DataService) private dataSvc: DataService) { }


  ngOnInit() {
    this.dataSvc.currentColor.subscribe((res : any)=>
    {
      if(res != 'default color' && res.id == this.data.id)
      {
        this.data.color = res.color;
        console.log("color for the dialog",res);
        
      }
    })

    this.dataSvc.currentReminder.subscribe((res : any)=>
    {
      if(res != 'reminder from dialog'  && res.id == this.data.id)
      {
        this.data.reminder = res.reminder;
        console.log("color for the dialog",res);
        
      }
    })

    this.dataSvc.currentcollabForDialog.subscribe((res : any)=>
    {
      if(res != 'initial collab'  && res.id == this.data.id)
      {
        this.data.collaborators = res.collaborators;
        // console.log("color for the dialog",res);
        
      }
    })


    this.dataSvc.currentLabelForDialog.subscribe((res : any)=>
    {
      if(res != 'initial label' && res.id == this.data.id)
      {
        console.log("response for the label",res);
        
        this.data.labels = res.noteLabels;
        // console.log("color for the dialog",res);
      }
    })

  }

  updateNote() {
    this.note = {
      title: this.title.value,
      description: this.description.value,
      noteId: this.data.id,
    }
    if ((this.note.title == null) && (this.data.title != null)) {
      this.note.title = this.data.title;
    }
    if ((this.note.description == null) && (this.data.description != null)) {
      this.note.description = this.data.description;
    }

    if ((this.note.title == "") && (this.note.description == "")) {
      this.note.title = "both are empty";
      this.note.description = "both are empty";
    }
    this.dialogRef.close();
    this.result = this.svc.editNote(this.note)
    this.result.subscribe((response) => {
      this.response = response;
      console.log("the result is ", this.response);
    });
    this.dataSvc.changeMessage("message from dialog");
  }


  deleteReminderFromNotes(id,reminder)
  {
    let data = 
    {
      noteIdList : [id],
      reminder : reminder
    }
    this.svc.deleteReminderFromNotes(data).subscribe((response: any) => {
      this.dataSvc.changeMessage(response);
      this.data.reminder = "";
      //console.log(response);
    });
  }



  deletelabelfromnotes(labelid, noteid) {
    let data = {
      id: labelid,
      noteId: noteid
    }
    console.log("label value.......", data);
    this.svc.deleteLabelFromNotes(data).subscribe((response: any) => {
            this.getNoteData(noteid);
      this.dataSvc.changeMessage(response);

      // this.data = this.noteData;
      //console.log(response);
    });
  }


  getNoteData(id) {
    this.result1 = this.svc.getNoteData(id)
    this.result1.subscribe((response) => {
      console.log("response from th color getNOteData function ",response);   
      this.response1 = response.data.data;
      this.noteData = this.response1[0];
      this.data.labels = this.noteData.noteLabels;
    });
  }


}
