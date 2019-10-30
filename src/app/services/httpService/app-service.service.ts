import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppServiceService {
  baseUrl = environment.base;
  // baseUrl1=environment.base1;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('id')
    })
  }

  httpOptionsGetNoteList = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('id')
    })
  }



  constructor(@Inject(HttpClient) private http: HttpClient) { }

  post(userObj, url, auth):Observable<any> {
    if (auth == false) {
      return this.http.post(this.baseUrl + url, userObj);
    }
    else {
      return this.http.post(this.baseUrl + url, userObj, this.httpOptions);
    }
  }

  get(url, auth):Observable<any> {
    if (auth == false) {
      return this.http.get(this.baseUrl + url);
    }
    else {
      return this.http.get(this.baseUrl + url, this.httpOptions);
    }
  }

  deleteCall(url):Observable<any> {
    return this.http.delete(this.baseUrl + url, this.httpOptions)
  }
  getNoteList(url):Observable<any> {
    return this.http.get(this.baseUrl + url, this.httpOptionsGetNoteList);
  }


  postImage(Obj, url):Observable<any> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('id')
      })
    }

    return this.http.post(this.baseUrl + url, Obj, httpOptions1);
  }

  postReset(data,url) :Observable<any>{
   let  httpOptionsReset =
    {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.baseUrl + url, data, httpOptionsReset);
  }


  patch(data,url):Observable<any>
  {
    return this.http.patch(this.baseUrl + url, data, this.httpOptions);
  }

}
