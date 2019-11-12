import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('default message');
  private viewSource = new BehaviorSubject('default view');
  private changeCheckboxList = new BehaviorSubject('Checkbox are added or deleted');
  private addLabelToNote = new BehaviorSubject('No labels are there');
  private initialCollaborator = new BehaviorSubject('No collaborator are there');
  private initialArchievstatus = new BehaviorSubject('initial archive status');
  private initialReminder = new BehaviorSubject('reminder from dialog');
  private initialColor = new BehaviorSubject('default color');
  private initialLabel = new BehaviorSubject('initial label')
  private initialCollabForDialog = new BehaviorSubject('initial collab');


  currentMessage = this.messageSource.asObservable();
  currentView = this.viewSource.asObservable();
  currentCheckbox = this.changeCheckboxList.asObservable();
  currentLabelAdd = this.addLabelToNote.asObservable();
  currentCollaborator = this.initialCollaborator.asObservable();
  currentArchiveStatus = this.initialArchievstatus.asObservable();
  currentReminder = this.initialReminder.asObservable();
  currentColor = this.initialColor.asObservable();
  currentcollabForDialog = this.initialCollabForDialog.asObservable();
  currentLabelForDialog = this.initialLabel.asObservable();

  constructor() { }


  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message: string) {
    this.viewSource.next(message)
  }


  changeCheckbox(message: any) {
    this.changeCheckboxList.next(message);
  }

  addLabel(message : any)
  {
    this.addLabelToNote.next(message);
  }

  changeCollaborator(message : any)
  {
    this.initialCollaborator.next(message);
  }

  changeArchiveStatus(message : any)
  {
    this.initialArchievstatus.next(message);
  }

  reminderFromDialog(message : any)
  {
    this.initialReminder.next(message);
  }

  changeColor(message : any)
  {
    this.initialColor.next(message);
  }

  sendCollabToDialog(message : any)
  {
    this.initialCollabForDialog.next(message);
  }

  sendLabelToDialog(message : any)
  {
    this.initialLabel.next(message);
  }
}
