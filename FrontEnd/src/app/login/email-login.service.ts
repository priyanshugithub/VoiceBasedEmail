import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse , HttpHeaders } from '@angular/common/http';

import {UserLogin} from './emailLogin';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class EmailLoginService {

  Data : UserLogin[]
  private _headersInfo = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private _loginURL = 'http://localhost:1234/login'

  constructor(private _http: HttpClient) { }

  Login(Data) :  Observable<UserLogin[]> {

    return this._http.post<UserLogin[]>(this._loginURL ,Data ,{ headers : this._headersInfo })
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
   }


   private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
}  

}
