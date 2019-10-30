import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatDialog } from '@angular/material';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  show = false;
  searchText : any ;
  result: any;
  backurl : any;
  url : any;
  response: any;
  email = localStorage.getItem('email');
  name = localStorage.getItem('name');
  labels: any;

  constructor(@Inject(Router)  private router: Router, @Inject(DataService) public dataSvc: DataService, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(MatDialog) private dialog: MatDialog) { }

  ngOnInit() {
    this.getNotesLabels();
    this.dataSvc.currentMessage.subscribe((res) => {
      this.getNotesLabels();
      this.changeimage();
      
    });

  }

  toggle()
  {
      this.show = !this.show;
      if(this.show)
      {
        this.dataSvc.changeView("list");
      }
      else{
        this.dataSvc.changeView("grid")
      }
  }


  getNotesLabels() {
    this.svc.getNoteLabelList().subscribe((response: any) => {
      this.labels = response.data.details.reverse();
      console.log(response.data.details);
    }, (error) => {
      console.log(error.statusText);
    });
  }

  logout() {
    localStorage.clear();

  }

  valuechange(newValue) {
    if(newValue.length==0 || newValue==null ){
      this.router.navigate(['/note']);
    }
    if(newValue.length>2){ 
      this.router.navigate(['/search']);
      this.dataSvc.changeMessage(newValue);
    }   
  }

  onEdit() {
    // console.log("the daialog labels are",this.labels);
    // console.log("the value of note is ");
    let dialogref = this.dialog.open(EditDialogComponent);
    dialogref.afterClosed().subscribe(result => {
      console.log("dialog result ", result);
    })
  }

  changeimage(){
    this.backurl = localStorage.getItem('imageUrl');  
    if(this.backurl){
      this.url = 'http://fundoonotes.incubation.bridgelabz.com/' + this.backurl;
    }else{
      this.url="";
    }
  }


  openDialog() {
    this.dialog.open(ImageDialogComponent, {width: '1031px',height: '636px'});
  }

  goToLabelData(data)
  {
    this.dataSvc.changeMessage(data); 
  }
}
