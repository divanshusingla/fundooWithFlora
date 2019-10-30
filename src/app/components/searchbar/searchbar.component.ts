import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatDialog } from '@angular/material';
import { SearchPipe } from 'src/app/search.pipe';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  searchText = null;
  filteredRecords : any;
  notes : Note;
  searchNote : any;
  allNotes : any;
  filterPipe : SearchPipe = new SearchPipe();
  component = "search";
  constructor(@Inject(NoteServiceService) private svc : NoteServiceService,@Inject(DataService) private dataSvc : DataService,@Inject(MatDialog) private dialog : MatDialog) { }

  ngOnInit() {
    this.getNoteData();
    this.dataSvc.currentMessage.subscribe((res:any)=>
    {
      this.getNoteData();
    })
  }

  getNoteData()
  {  
    this.dataSvc.currentMessage.subscribe((searchText) => {
    this.searchText = searchText
     this.svc.getNotesData().subscribe((response : any) =>
    {    
      this.notes = response.data.data.reverse();
      this.notes = this.filterData(this.notes);
      this.allNotes = this.notes;
      this.filteredRecords=this.filterPipe.transform(this.allNotes,this.searchText);
      this.searchNote = this.filteredRecords;
      // console.log("sdsadasdasd",this.searchNote);
      
    },(error)=>{
      console.log(error);
    });
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
