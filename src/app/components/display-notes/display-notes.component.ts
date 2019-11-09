import { Component, OnInit, Inject, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import {Note} from '../../models/note.model';
import {DataService} from 'src/app/services/dataService/data.service';
import {MatDialog} from '@angular/material';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
import { FormControl } from '@angular/forms';

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
checkboxViewData : any;
itemForChecklist = new FormControl;
checklistItemModel : any;
  constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService,@Inject(MatDialog) private dialog : MatDialog) { }

  ngOnInit() {
    this.dataSvc.currentCheckbox.subscribe((res)=> {
      this.checkboxViewData = res;
      console.log('checkboxViewData =>>>>>>>>..',this.checkboxViewData );
      
    })

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
  console.log("label value.......", data);
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



addItemToChecklist(noteid)
{
  let checkListData =
  {
    "itemName" : this.itemForChecklist.value,
    "status" : "open",
    noteId : noteid,
  }
  this.svc.addItemToChecklist(checkListData).subscribe((response: any) => {
    this.dataSvc.changeMessage(response);
    console.log('from the checklist ================>>>>>>>',response);
    this.checklistItemModel = "";
  });
}




deleteItemFromChecklist(itemid,noteid)
{
  let itemData = {
    "noteId" : noteid,
    "checklistId" : itemid,
    "isDeleted" : true,
  }
  this.svc.deleteItemFromChecklist(itemData).subscribe((response: any) => {
    this.dataSvc.changeMessage(response);
    console.log('from the checklist ================>>>>>>>',response);
    this.checklistItemModel = "";
  });
}


updateItemFromChecklist(status,itemid,noteid,itemName)
{
  var itemDataUpdate = {};

if(status == "open")
{
 itemDataUpdate = 
  {
    "status" : "close",
    "checklistId" : itemid,
    "noteId" : noteid,
    "itemName" : itemName,
  }
}
else
{
 itemDataUpdate = 
  {
    "status" : "open",
    "checklistId" : itemid,
    "noteId" : noteid,
    "itemName" : itemName,
  }
}

// console.log("asssssssssssssssssssssssssssssssss",itemDataUpdate);

  this.svc.updateItemFromChecklist(itemDataUpdate).subscribe((response: any) => {
    this.dataSvc.changeMessage(response);
    console.log('from the checklist ================>>>>>>>',response);
    this.checklistItemModel = "";
  });
}






}
