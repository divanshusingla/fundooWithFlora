import { Component, OnInit, Input, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-unarchive-icon',
  templateUrl: './unarchive-icon.component.html',
  styleUrls: ['./unarchive-icon.component.scss']
})
export class UnarchiveIconComponent implements OnInit {
  @Input() noteid: any;
  result: any;
  response: any;

  constructor(@Inject(MatSnackBar) private _snackBar: MatSnackBar,@Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) private dataSvc: DataService) { }

  ngOnInit() {
  }
  unarchiveNotes(id)
  {
    let unarchive = 
    {
      isArchived : false,
      noteIdList : [id]
    }
    this.result = this.svc.archiveNotes(unarchive)
    this.result.subscribe((response) => {
      this.response = response;
      console.log("the result is ", this.response);
    });

  this.openSnackBar('Note is  restored',"Close");
    this.dataSvc.changeMessage("Note is restored");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
