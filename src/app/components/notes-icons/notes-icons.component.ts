import { Component, OnInit,Inject, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {DataService} from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-notes-icons',
  templateUrl: './notes-icons.component.html',
  styleUrls: ['./notes-icons.component.scss']
})
export class NotesIconsComponent implements OnInit {
 @Input() noteid : any;
 @Output() messageEvent= new EventEmitter<string>();
 message : string = "to change color";

  result : any;
  response : any;
  colorArray: any = [
    {color:'#ECEEEE'}, {color:'#F28B82'}, {color:'#F7BC04'}, {color:'#FAF474'}, 
    {color:'#CBFF90'}, {color:'#AAFEEB'}, {color:'#CBF0F8'},{color: '#ADCBFA'},
    {color:'#D7AEFB'}, {color:'#FDCFE8'}, {color:'#E6C9A8'},{color: '#FFFFFF'}];

  constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService) { }
@Input() archive : any;

  ngOnInit() {
  }

  changeColor(noteid,color)
  {
    let colorData =
    {
      noteIdList : [noteid],
      color : color
    }

    this.result = this.svc.changeColor(colorData)
    this.result.subscribe((response) => {
      this.response = response;
      this.messageEvent.emit(this.message)
      console.log("the result is ", this.response);
    });
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




  trashNotes(id)
  {
    let trash = 
    {
      isDeleted : true,
      noteIdList : [id]
    }
    this.result = this.svc.trashNotes(trash)
    this.result.subscribe((response) => {
      this.response = response;
      console.log("the result is ", this.response);
    });
    this.dataSvc.changeMessage("message from dialog");
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
    this.dataSvc.changeMessage("message from dialog");
  }
}
