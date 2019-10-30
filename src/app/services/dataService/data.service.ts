import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('default message');
  private viewSource = new BehaviorSubject('default view');
  currentMessage = this.messageSource.asObservable();
  currentView = this.viewSource.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message : string)
  {
    this.viewSource.next(message)
  }


}
