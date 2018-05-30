/**
 * Created by e.emmeni on 06/02/18.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {RequestOptions, Response, URLSearchParams} from '@angular/http';
import {HttpInterceptorService} from './http-interceptor.service';
import {Pageable} from '../models/Pageable';
import {environment} from '../../environments/environment';

interface Storage  {
  timesheets:  [any];
  timeslots:  [any];
  timeslotHstries: [any];
}

@Injectable()
export class TimesheetService {

  timesheets$: Observable<any>;
  private _timesheetsObserver: Observer<any>;

  timeslots$: Observable<any>;
  private _timeslotsObserver: Observer<any>;

  timeslotHstries$: Observable<any>;
  private _timeslotHstriesObserver: Observer<any>;

  private storage: Storage = <Storage>{};

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  private extractData(res: Response) {
    let body = null;
    if (res.text()) {
      body = res.json();
    }
    return body;
  }

  constructor(private _http: HttpInterceptorService) {
    this.timesheets$ = new Observable<any>(observer => {
      this._timesheetsObserver = observer;
    }).share();

    this.timeslots$ = new Observable<any>(observer => {
      this._timeslotsObserver = observer;
    }).share();

    this.timeslotHstries$ = new Observable<any>(observer => {
      this._timeslotHstriesObserver = observer;
    }).share();

  }

  // Function use To get timeSlotHistory by class Id
  getTimeSlotHistoryByClassId(idSchool, idClass) {

    const params = new URLSearchParams();
    params.set('idSchool', idSchool);

    this._http.get(environment.URL + '/time-sheets/classroom/' + idClass, { search: params }).subscribe(
      (res: Response) => {
        this.storage.timeslotHstries = res.json();
        this._timeslotHstriesObserver.next(this.storage.timeslotHstries);
      }
    );
  }

  // Function use To get timeSlotHistory by class Id
  getTimeSlotHtryByClassId(idSchool, idClass) {

    const params = new URLSearchParams();
    params.set('idSchool', idSchool);

    return this._http.get(environment.URL + '/time-sheets/classroom/' + idClass, { search: params }).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use To get timeSlotHistory by user Id
  getTimeSlotHtryByUserId(idUser) {

    return this._http.get(environment.URL + '/time-sheets/user/' + idUser).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
