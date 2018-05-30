/**
 * Created by e.emmeni on 28/06/17.
 */
import {Injectable} from '@angular/core';
import {User, UserDTO} from '../models/User';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {HttpInterceptorService} from './http-interceptor.service';
import {Pageable} from '../models/Pageable';
import {Subject} from 'rxjs/Subject';
import {Student} from '../models/Student';


@Injectable()
export class UserService {

  students$: Observable<any>;
  private _studentsObserver: Observer<any>;

  users$: Observable<any>;
  private _usersObserver: Observer<any>;

  user$: Observable<any>;
  private _userObserver: Observer<any>;

  private _dataStorage: {
    users: User[]
    user: User
    students: Student[]
  };

  // ---- When a new user is created, all the component which have a users box will be updated
  private subject: Subject<User> = new Subject<User>();

  setUserCreated(userCreated: User): void {
    this.subject.next(userCreated);
  }

  getUserCreated(): Observable<User> {
    return this.subject.asObservable();
  }
  // ---- End

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  private extractData(res: Response) {
    let body;
    if (res.text()) { body = res.json(); }
    return body;
  }

  constructor(private _http: HttpInterceptorService) {
    this.users$ = new Observable<User[]>(observer => {
      this._usersObserver = observer;
    }).share();

    this.user$ = new Observable<User>(observer => {
      this._userObserver = observer;
    }).share();


    this.students$ = new Observable<User>(observer => {
      this._studentsObserver = observer;
    }).share();

    this._dataStorage = { users: [] , user : <User>{}, students: [] };
  }

  // Function Use To save user data
  saveUser(data) {
    return this._http.post(environment.URL + '/account', data).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to load user data
  loadUser() {
    this._http.get(environment.URL + '/account').subscribe((data: Response) => {
      if (this._userObserver !== undefined) {
        this._userObserver.next(data.json());
      }
      // console.log('User Received ', data.json());
    }, error => console.log('Could not load users'));
  }

  // Function Use to Login User
  loginUser(user) {

    const data = {
      username: user.username,
      password: user.password,
      rememberMe: true
    };

    const extractData = function (res: Response) {
      const body = res.json();
      localStorage.clear();
      const token = JSON.parse(atob(body.id_token.split('.')[1]));
      localStorage.setItem('token_jwt', body.id_token);
      localStorage.setItem('token', token.sub);
      localStorage.setItem('auth', token.auth );
      localStorage.setItem('sAuth', token.sAuth );
      localStorage.setItem('expires', body.exp);
    };
    return this._http.post(environment.URL + '/authenticate',  JSON.stringify(data)).toPromise()
      .then(extractData)
      .catch(this.handleError);
  }

  // Function Use To reset Password
  resetPassword(email) {
    return this._http.get(environment.URL + '/users/resetPassword/' + email).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function Use To create an Account
  signUp(data) {
    return this._http.post(environment.URL + '/register', data).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to Activate use Account
  activateAccount(key) {
    return this._http.get(environment.URL + '/activate?key=' + key).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to reset password for Account
  requestPasswordReset(mail: any) {
    return this._http.post(environment.URL + '/account/reset_password/init', mail).toPromise()
      .then(
        (res: Response) => res.text()
      )
      .catch(this.handleError);
  }

  // Function use to reset password for Account
  finishPasswordReset(keyAndPassword: any) {
    return this._http.post(environment.URL + '/account/reset_password/finish', keyAndPassword).toPromise()
      .then(
        (res: Response) => res.text()
      )
      .catch(this.handleError);
  }

  // Function use to create user
  createUser(data) {
    return this._http.post(environment.URL + '/users', data).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  loadAccount(login) {
    return this._http.get(environment.URL + '/users/' + login).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to load user By login
  loadUserByLogin(login) {
    this._http.get(environment.URL + '/users/' + login).subscribe((data: Response) => {
      if (this._userObserver !== undefined) {
        this._userObserver.next(data.json());
      }
    }, error => console.log('Could not load users'));
  }

  // Function use to get school Id
  getSchoolId(id, pageable: Pageable) {

    const params = new URLSearchParams();
    params.set('page', pageable.page.toString());
    params.set('size', pageable.size.toString());

    return this._http.get(environment.URL + '/schools/user/' + id, { search: params }).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function use to load user By login
  loadUserResultById(login) {
    return  this._http.get(environment.URL + '/users/' + login).toPromise()
      .then(this.extractData)
      .catch(this.handleError
      );
  }

  // Function use to load user By id
  getUserById(id) {
    return  this._http.get(environment.URL + '/users/iden/' + id).toPromise()
      .then(this.extractData)
      .catch(this.handleError
      );
  }

  // Function use To get All Students
  getUsersForSchoolId(idSchool, pageable: Pageable) {

    const params = new URLSearchParams();
    params.set('page', pageable.page.toString());
    params.set('size', pageable.size.toString());

    this._http.get(environment.URL + '/users/school/' + idSchool, { search: params }).subscribe(
      (res: Response) => {
        this._dataStorage.users = res.json();
        this._usersObserver.next(this._dataStorage.users);
      }
    );
  }

  // Function use To get All Students
  getUsersBySchoolId(idSchool) {

    this._http.get(environment.URL + '/users/school/' + idSchool).subscribe(
      (res: Response) => {
        this._dataStorage.users = res.json();
        this._usersObserver.next(this._dataStorage.users);
      }
    );
  }

  // Function use To get All Students by class id
  getUsersByClassId(idClass) {

    this._http.get(environment.URL + '/users/class/' + idClass).subscribe(
      (res: Response) => {
        this._dataStorage.students = res.json();
        this._studentsObserver.next(this._dataStorage.students);
      }
    );
  }

  // Function use To get All Students by class id
  getUsersFromClassId(idClass) {
    return  this._http.get(environment.URL + '/users/class/' + idClass).toPromise()
      .then(this.extractData)
      .catch(this.handleError
      );
  }


  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
}
