import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-reminder-icon',
  templateUrl: './reminder-icon.component.html',
  styleUrls: ['./reminder-icon.component.scss']
})
export class ReminderIconComponent implements OnInit {

  @Input() noteid : any;
  // currentDateTime = new Date();
  // options = { weekday: 'short', year: 'numeric', month: 'short'};
  // time : any;
  // date : any;
  result : any;
  response : any;
  reminderDate = new FormControl();
  reminderTime = new FormControl();
  @Output() reminderEvent = new EventEmitter<string>();

  constructor(@Inject(NoteServiceService) private svc: NoteServiceService,@Inject(DataService) private dataSvc : DataService) { }

  ngOnInit() {
    // this.currentTime();
    }

// currentTime()
// {
//   this.formatAMPM(this.currentDateTime);
//   this.date = this.currentDateTime.toLocaleDateString("en-US", this.options);
//   console.log("sssssssssssssssssss",this.date)
// }

//  formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   this.time = hours + ampm;
// }


setReminder()
{
  if(this.noteid){
  console.log("dffffffffff",this.reminderDate,this.reminderTime);
  let reminderObj =
  {
    noteIdList : [this.noteid],
    reminder : [this.reminderDate.value],
  }
  console.log("dddddddddddddddd",reminderObj); 
  this.result = this.svc.addReminderToNOte(reminderObj)
  this.result.subscribe((response) => {
    this.response = response;
    console.log('response',this.response); 
  });
this.dataSvc.changeMessage("reminder is added");
}
else
{  
  this.reminderEvent.emit(this.reminderDate.value);
}
}

}