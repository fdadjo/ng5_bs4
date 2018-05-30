/**
 * Created by e.emmeni on 28/06/17.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {RequestOptions, Response, URLSearchParams} from '@angular/http';
import {HttpInterceptorService} from './http-interceptor.service';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {School} from '../models/School';
import {Pageable} from '../models/Pageable';

interface Storage  {
  schools: [any];
  directors: [any];
  school: [any];
}

@Injectable()
export class SchoolService {

  schools$: Observable<any>;
  private _schoolsObserver: Observer<any>;

  school$: Observable<any>;
  private _schoolObserver: Observer<any>;


  directors$: Observable<any>;
  private _directorsObserver: Observer<any>;

  private storage: Storage = <Storage>{};

  // ---- When a new school is created, all the component which have a school box will be updated
  private schoolSubject: Subject<School> = new Subject<School>();

  setSchoolCreated(schoolCreated: School): void {
    this.schoolSubject.next(schoolCreated);
  }

  getSchoolCreated(): Observable<School> {
    return this.schoolSubject.asObservable();
  }
  // ---- End

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  private extractData(res: Response) {
    let body;
    if (res.text()) {
      body = res.json();
    }
    return body;
  }

  constructor(private _http: HttpInterceptorService) {

    this.schools$ = new Observable<any>(observer => {
      this._schoolsObserver = observer;
    }).share();

    this.school$ = new Observable<any>(observer => {
      this._schoolObserver = observer;
    }).share();

    this.directors$ = new Observable<any>(observer => {
      this._directorsObserver = observer;
    }).share();
  }

  // Function use To get All school
  getAllSchools(id, pageable: Pageable) {

    const params = new URLSearchParams();
    params.set('page', pageable.page.toString());
    params.set('size', pageable.size.toString());

    this._http.get(environment.URL + '/schools/user/' + id, { search: params }).subscribe(
      (res: Response) => {
        this.storage.schools = res.json();
        this._schoolsObserver.next(this.storage.schools);
      }
    );
  }

  // Function use to get one school
  getSchoolById(id) {
    return this._http.get(environment.URL + '/schools/' + id).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to get one school
  getSchoolDetailById(id) {
    return this._http.get(environment.URL + '/schools/' + id).subscribe(
      (res: Response) => {
        this.storage.school = res.json();
        this._schoolObserver.next(this.storage.school);
      }
    );
  }

  // Function use to create one school
  createSchool(data) {
    return this._http.post(environment.URL + '/schools', data).toPromise()
      .then(success => {

          let body;
          if (success.text()) {
            body = success.json();
            this.setSchoolCreated(body);
          }
          return body;
        },
        error => console.log(error))
      .catch(this.handleError);
  }

  // Function use to update school
  updateSchool(data) {
    return this._http.put(environment.URL + '/schools', data).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to Delete schools
  deleteSchool(data) {
    return this._http.delete(environment.URL + '/schools/delete', new RequestOptions({ body: data })).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to upload file
  uploadFile(formData, options) {
    return this._http.post(environment.URL + '/schools/uploadFiles', formData, options).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
