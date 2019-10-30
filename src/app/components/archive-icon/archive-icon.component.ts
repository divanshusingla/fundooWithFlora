import { Component, OnInit, Input, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {DataService} from 'src/app/services/dataService/data.service';
@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit {
  @Input() noteid : any;
  result : any;
  response : any;

  constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService) { }

  ngOnInit() {
  }

  archiveNotes(id)
  {
    let archive = 
    {
      isArchived : true,
      noteIdList : [id]
    }
    this.result = this.svc.archiveNotes(archive)
    this.result.subscribe((response) => {
      this.response = response;
      console.log("the result is ", this.response);
    });
    this.dataSvc.changeMessage("message from dialog");
  }

  
}
