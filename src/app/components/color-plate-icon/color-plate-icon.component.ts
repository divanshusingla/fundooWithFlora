import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';

@Component({
  selector: 'app-color-plate-icon',
  templateUrl: './color-plate-icon.component.html',
  styleUrls: ['./color-plate-icon.component.scss']
})
export class ColorPlateIconComponent implements OnInit {
  @Input() noteid: any;
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "to change color";
  result: any;
  response: any;
  colorArray: any = [
    { color: '#ECEEEE' }, { color: '#F28B82' }, { color: '#F7BC04' }, { color: '#FAF474' },
    { color: '#CBFF90' }, { color: '#AAFEEB' }, { color: '#CBF0F8' }, { color: '#ADCBFA' },
    { color: '#D7AEFB' }, { color: '#FDCFE8' }, { color: '#E6C9A8' }, { color: '#FFFFFF' }];


  constructor(@Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) private dataSvc: DataService) { }

  ngOnInit() {
  }
  changeColor(noteid, color) {
    if (noteid) {
      let colorData =
      {
        noteIdList: [noteid],
        color: color
      }
      this.result = this.svc.changeColor(colorData)
      this.result.subscribe((response) => {
        this.response = response;
        this.messageEvent.emit(this.message)
        console.log("the result is ", this.response);
      });
      this.dataSvc.changeMessage("color is changed");
    }
    else {
      this.messageEvent.emit(color);
    }
  }
}
