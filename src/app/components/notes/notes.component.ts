import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteServiceService } from './../../services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  component = "mainnotes";
  show: boolean = true;
  response: any;
  result: any;
  titleMo: any;
  descriptionMo: any;
  title = new FormControl;
  description = new FormControl;
  note: Note = new Note();
  labelDataArray: any = [];
  checklistShow: any = false;
  labelDataArrayLabel: any = [];
  item = new FormControl;
  itemmodel: any;
  itemArray: any = [];
  checklistIndex: any;
  collaboratorData :any = [];
  archiveStatus = false ;


  @Output() messageEvent = new EventEmitter<string>();
  @Output() reminderEvent = new EventEmitter<string>();

  message: any;
  reminderMessage: any;
  labelData: any;
  toggle() {
    this.show = !this.show;
    this.titleMo = "";
    this.descriptionMo = "";
    this.message = "";
    this.reminderMessage = "";
    this.labelDataArrayLabel = [];
    this.collaboratorData = [];
    this.itemArray = [];
  }

  constructor(@Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) private datasvc: DataService) { }
  ngOnInit() {
    this.datasvc.currentLabelAdd.subscribe((res) => {
      this.labelData = res;
      console.log("reponse on dding label ", res);
    });

    this.datasvc.currentArchiveStatus.subscribe((res:any) => {
      console.log("res..........",res);
      if(res != "initial archive status"){
              this.archiveStatus = res.isArchived;
      console.log("Archive status from the init ", res.isArchived);
      this.receiveData();
      }
    });


    this.datasvc.currentCollaborator.subscribe((res) => {
      if(res != "No collaborator are there")
      {
        this.collaboratorData.push(res);
      }
    });


    this.datasvc.currentCheckbox.subscribe((res: any) => {
      console.log("checklist", res);
      if (!res.id) {
        if (res.show == "Checkbox are added or deleted") {
          this.checklistShow = false;
        } else {
          this.checklistShow = res.show;
        }
      }
    })
  }
  receiveData() {
    console.log("this. archiev statsus ", this.archiveStatus);
    
    if (this.title.value == null && this.description.value == null) {
      this.toggle();
    }
    else {
      this.note = {
        title: this.title.value,
        description: this.description.value,
        color: this.message,
        reminder: this.reminderMessage,
        labelIdList: JSON.stringify(this.labelDataArray),
        checklist : JSON.stringify(this.itemArray),
        collaberators : JSON.stringify(this.collaboratorData),
        isArchived : this.archiveStatus,
      }
      this.result = this.svc.receiveNotesData(this.note)
      this.result.subscribe((response) => {
        this.response = response;
        // console.log(this.response);
        this.datasvc.changeMessage("Hello from Sibling")
      });
      this.toggle();
      console.log("note data with label data array ", this.labelDataArray);
    }
  }

  receiveMessage($event) {
    this.message = $event;
    // this.messageEvent.emit(this.message);
    // console.log("in notesdfdfdsfdsf", this.message);
  }

  receiveReminderMessage($event) {
    this.reminderMessage = $event;
    // this.messageEvent.emit(this.message);
    // console.log("in notesdfdfdsfdsf",$event);
  }

  checkAlreadyExistence(value : any){
    console.log("lsbel array ============>>>>>>>>>>>>>", this.labelDataArrayLabel);
    let flag=true;
    for(var i=0 ; i < this.labelDataArrayLabel.length ; i++) 
    {
      console.log("sadasdasdasdasdasdasdasdasD",value)
      if(this.labelDataArrayLabel[i].labelId == value.labelId)
      flag=false;
    }
    console.log("sdffffffffffffffffffffffffffff",flag)
    return flag;
  }



  receiveLabelMessage($event) {
    console.log("asdfafdasda value from checking label", this.checkAlreadyExistence($event));
    if(this.checkAlreadyExistence($event))
    {
    this.labelDataArrayLabel.push($event)
    this.labelDataArray.push($event.labelId);
    // console.log("ebefcef ", $event);
    this.labelData = $event;
    console.log("labeldata from the event ==>>>>>>>>>.", this.labelDataArray);
    }
  }

  clearReminder()
  {
    this.reminderMessage = "";
  }

  listitem() {
    console.log("lenght...", this.itemArray.length);
    this.itemArray[this.itemArray.length] = { itemName: this.item.value, status: "open" };
    this.itemmodel = '';
    console.log("Array...", this.itemArray)
  }

  updatestatus(itemname, status) {
    this.checklistIndex = this.itemArray.findIndex(i => i.itemName === itemname);
    if (status == 'open') {
      this.itemArray[this.checklistIndex].status = 'close';
    } else {
      this.itemArray[this.checklistIndex].status = 'open';
    }
  }


  deletechecklist(itemname) {
    this.checklistIndex = this.itemArray.findIndex(i => i.itemName === itemname);
    console.log("index....", this.itemArray.findIndex(i => i.itemName === itemname));
    this.itemArray.splice(this.checklistIndex, 1);
  }

  removeLabelFromNote(id)
  {
    let labelIndex = this.labelDataArrayLabel.findIndex(i => i.id === id);
    this.labelDataArrayLabel.splice(labelIndex,1);
  }






}
