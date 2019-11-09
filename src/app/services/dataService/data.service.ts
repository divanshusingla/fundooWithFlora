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

  currentMessage = this.messageSource.asObservable();
  currentView = this.viewSource.asObservable();
  currentCheckbox = this.changeCheckboxList.asObservable();
  currentLabelAdd = this.addLabelToNote.asObservable();
  currentCollaborator = this.initialCollaborator.asObservable();

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

}
