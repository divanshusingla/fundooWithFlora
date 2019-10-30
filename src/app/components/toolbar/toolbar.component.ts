import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

@Input() noteid : any;
@Input() function : any;
@Output() messageEvent= new EventEmitter<string>();
@Output() reminderEvent= new EventEmitter<string>();


message : any;
  constructor() { }

  ngOnInit() {
  
  }


 receiveMessage($event) {
  this.message = $event;
  this.messageEvent.emit(this.message);
  console.log("color emitter",this.message);
}

receiveReminderMessage($event) {
  this.reminderEvent.emit($event);
  console.log("reminder emitter",$event);
}

}
