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
  title = new FormControl();
  description = new FormControl();
  note: UpdateNote = new UpdateNote();
  // labelName = new FormControl();
  // labelDialog: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(MatDialogRef) private dialogRef: MatDialogRef<NoteMainComponent>, @Inject(DataService) private dataSvc: DataService) { }


  ngOnInit() {
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

}
