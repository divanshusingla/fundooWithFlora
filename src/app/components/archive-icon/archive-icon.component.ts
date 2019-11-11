import { Component, OnInit, Input, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit {
  @Input() noteid: any;
  result: any;
  response: any;

  constructor(@Inject(MatSnackBar) private _snackBar: MatSnackBar, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) private dataSvc: DataService) { }

  ngOnInit() {
  }

  archiveNotes(id) {
    if (id) {
      let archive =
      {
        isArchived: true,
        noteIdList: [id]
      }
      this.result = this.svc.archiveNotes(archive)
      this.result.subscribe((response) => {
        this.response = response;
        console.log("the result is ", this.response);
      });
      this.openSnackBar('Note is archived', "Close");
      this.dataSvc.changeMessage("message from dialog");
    }
    else{
      
      let archiveStatus = 
      {
        isArchived : true,
      }
      this.dataSvc.changeArchiveStatus(archiveStatus);
    }

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
