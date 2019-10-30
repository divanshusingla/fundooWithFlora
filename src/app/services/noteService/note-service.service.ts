import { Injectable, Inject } from '@angular/core';
import { AppServiceService } from '../httpService/app-service.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  constructor(@Inject(AppServiceService) private svc: AppServiceService) { }

  receiveNotesData(data):Observable<any> {
    let url = 'notes/addNotes';
    let auth = true;
    return this.svc.post(data, url, auth);
  }

  getNotesData() :Observable<any> {
    let url = 'notes/getNotesList';
    let auth = true;
    return this.svc.get(url, auth);
  }

  archiveNotes(data) :Observable<any> {
    let url = 'notes/archiveNotes';
    let auth = true;
    return this.svc.post(data, url, auth);
  }

  trashNotes(data):Observable<any>  {
    let url = 'notes/trashNotes';
    let auth = true;
    return this.svc.post(data, url, auth);
  }

  deleteForever(data) :Observable<any> {
    let url = 'notes/deleteForeverNotes';
    let auth = true;
    return this.svc.post(data, url, auth);
  }

  editNote(data) :Observable<any>{
    let url = 'notes/updateNotes';
    let auth = true;
    return this.svc.post(data, url, auth);
  }

  changeColor(data) :Observable<any>{
    let url = 'notes/changesColorNotes';
    let auth = true;
    return this.svc.post(data, url, auth);
  }


archivedNotesList():Observable<any>{
  let url= 'notes/getArchiveNotesList'
  let auth = true;
  return this.svc.get(url,auth);
}

trashNotesList():Observable<any>{
  let url= 'notes/getTrashNotesList'
  let auth = true;
  return this.svc.get(url,auth);
}

getNoteLabelList():Observable<any>
{
  let url= 'noteLabels/getNoteLabelList'
  return this.svc.getNoteList(url);
}

addLabel(data):Observable<any>
{
  let url= 'noteLabels'
  let auth = true;
  return this.svc.post(data,url,auth);
}


deleteLabel(data):Observable<any>
{
  let id = data.id;
  console.log("data is is ",id)
  let url= 'noteLabels/' + id + '/deleteNoteLabel'
  return this.svc.deleteCall(url);
}


updateNoteLabel(data):Observable<any>
{
  let id = data.id;
  console.log("data is is ",id)
  let url= 'noteLabels/' + id + '/updateNoteLabel';
  let auth = true;
  return this.svc.post(data,url,auth);
}

addLabelToNotes(data):Observable<any>{
  let url= 'notes/'+data.noteId+'/addLabelToNotes/'+data.labelId+'/add';
  let auth=true;
  return this.svc.post(data,url,auth)
}



getNotesByLabel(label):Observable<any>
{
  let url= 'notes/getNotesListByLabel/' + label.labelName
  let auth = true;
  return this.svc.post(label,url,auth);
}

deleteLabelFromNotes(Obj):Observable<any>{
  let url= 'notes/' + Obj.noteId + '/addLabelToNotes/' + Obj.id + '/remove'
  let auth = true;
  return this.svc.post(Obj,url,auth);
}

addReminderToNOte(data)
{
  let url = 'notes/addUpdateReminderNotes';
  let auth = true;
  return this.svc.post(data,url,auth);
}


deleteReminderFromNotes(data)
{
  let url = 'notes/removeReminderNotes';
  let auth = true ;
  return this.svc.post(data,url,auth);
}

addCollaborator(data)
{
  let url = 'notes/' + data.noteId + '/AddcollaboratorsNotes';
  let auth = true;
  return this.svc.post(data,url,auth);
}

getCollaborators(data)
{
  let url = 'notes/' + data.noteId;
  let auth = true;
  return this.svc.patch(data,url);
}


deleteCollaborators(data)
{
  let url = 'notes/' + data.noteId + '/removeCollaboratorsNotes/' + data.userId;
  return this.svc.deleteCall(url);
}

getNoteData(data)
{
  let url = 'notes/getNotesDetail/' + data;
  let auth = true;
  return this.svc.get(url,auth);
}

addQuestionToNote(data)
{
  let url = 'questionAndAnswerNotes/addQuestionAndAnswer';
  let auth = true;
  return this.svc.post(data,url,auth);
}

}
