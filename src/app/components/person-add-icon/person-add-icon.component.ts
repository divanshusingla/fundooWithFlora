import { Component, OnInit, Inject, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatDialog } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';


@Component({
  selector: 'app-person-add-icon',
  templateUrl: './person-add-icon.component.html',
  styleUrls: ['./person-add-icon.component.scss']
})
export class PersonAddIconComponent implements OnInit {

  constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService,@Inject(MatDialog) private dialog : MatDialog) { }

  @Input() noteid : any;
  ngOnInit() {
  }


  openCollaboratorDialog()
  {
      // console.log("the daialog labels are",this.labels);
      // console.log("the value of note is ");
      let dialogref = this.dialog.open(CollaboratorComponent,
       {
         data : {noteId : this.noteid},
        width: '600px',
        height: '257px'}
      );
      dialogref.afterClosed().subscribe(result => {
        console.log("dialog result ", result);
      })
    
  

  }



}
