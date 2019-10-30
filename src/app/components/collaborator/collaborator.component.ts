import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { NoteMainComponent } from '../note-main/note-main.component';
import { DataService } from 'src/app/services/dataService/data.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  usersData: any;
  backurl: any;
  url: any;
  dataF: any;
  collaboratorSearch: any;
  token = localStorage.getItem('id');
  userName = localStorage.getItem('name');
  userEmail = localStorage.getItem('email');
  userImageUrl = localStorage.getItem('imageUrl');
  noteIdCollab = this.data.noteId;
  collaboratorsList : any;
  searchBarCollabb : any;
  constructor(@Inject(UserServiceService) private userSvc: UserServiceService, @Inject(MAT_DIALOG_DATA) private data: any, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(MatDialogRef) private dialogRef: MatDialogRef<NoteMainComponent>, @Inject(DataService) private dataSvc: DataService) {
    this.backurl = localStorage.getItem('imageUrl');
    if (this.backurl) {
      this.url = 'http://fundoonotes.incubation.bridgelabz.com/' + this.backurl;
    } else {
      this.url = "";
    }
  }
  ngOnInit() {
    this.getCollaborators();
  }

  getUsersList(event: any) {
    let collaboratorData = {
      "searchWord": event,
    }
    this.userSvc.getUsersListCollaborator(collaboratorData).subscribe((response: any) => {
      this.usersData = response.data.details;
      this.dataF = this.usersData;
      console.log("sdsssssssssssssss", this.usersData);

    }, (error) => {
      console.log(error);
    });
  }
  addCollaborator() {
    let userObj =
    {
      firstName: this.dataF[0].firstName,
      lastName: this.dataF[0].lastName,
      email: this.dataF[0].email,
      userId: this.dataF[0].userId,
      noteId: this.data.noteId,
    }
    // console.log("fadasdasdasdasdada",userObj.noteId);
    this.svc.addCollaborator(userObj).subscribe((response: any) => {
     console.log('response', response);
     this.getCollaborators();
    }, (error) => {
      console.log(error);
    });
  }


  getCollaborators()
  {
    let collab = {
      noteId : this.data.noteId
    }
    this.svc.getCollaborators(collab).subscribe((response: any) => {
      console.log('response to get collabaasdfc', response); 
      this.collaboratorsList = response.collaborators;
      this.searchBarCollabb = " ";
      this.collaboratorSearch = "";
      this.dataSvc.changeMessage("collaborators are added or removed")
     }, (error) => {
       console.log(error);
     });

  }

  deleteCollaborators(user,note)
  {
    let deleteCollab = {
      userId : user,
      noteId : note
    }
    this.svc.deleteCollaborators(deleteCollab).subscribe((response: any) => {
      console.log("response from deletion of collab ",response);
      this.getCollaborators();
    }, (error) => {
       console.log(error);
     });
  }


}
