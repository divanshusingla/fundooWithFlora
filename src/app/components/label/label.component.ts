import { Component, OnInit, Inject, Input } from '@angular/core';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() labelName : any;
  notes : any;
  notesByLabel : any;
  filteredRecords : any;
  component = "notesByLabel";
  label : any;
  

  constructor(@Inject(ActivatedRoute) private route : ActivatedRoute, @Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService,@Inject(MatDialog) private dialog : MatDialog) { }

  ngOnInit() {

     this.route.params.subscribe(params => {
      this.label = params['label'];
      this.getNotesByLabel();
      });
    this.dataSvc.currentMessage.subscribe((res:any)=>
    {
      this.getNotesByLabel();
    })
  }




  getNotesByLabel() {
     let data={
      labelName: this.label
    }
    this.svc.getNotesByLabel(data).subscribe((response: any) => {
      this.notes = response.data.data;
      this.notes = this.filterData(response.data.data);
      this.notesByLabel = this.notes;
      this.notesByLabel.reverse();
      console.log("response........",response);
      console.log("notes........",this.notes);      
    }, (error) => {
      console.log(error);
    });
 }

  filterData(data)
  {
    var result = data.filter(function(note)
    {
      return (note.isArchived == false || note.isDeleted == false );
    })
    return result;
  }

}
