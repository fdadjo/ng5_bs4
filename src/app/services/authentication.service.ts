import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "./http-interceptor.service";
import {Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {CommonService} from "./common-service";

@Injectable()
export class AuthenticationService extends CommonService {

  //Function Use to Login User
  loginUser(user) {
    let extractData = function (res : Response) {
      let body = res.json();
      localStorage.clear();
      let token = JSON.parse(atob(body.id_token.split('.')[1]));
      localStorage.setItem('token_jwt', body.id_token);
      localStorage.setItem('token', token.sub);
      localStorage.setItem('auth', token.auth );
      localStorage.setItem('expires', body.exp);
    };
    return this._http.post(environment.URL+"/authenticate",  user).toPromise()
      .then(extractData)
      .catch(this.handleError);
  }

  //Function Use To reset Password
  resetPassword(email) {
    return this._http.get(environment.URL+"/users/resetPassword/"+email).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  //Function Use To create an Account
  signUp(data) {
    return this._http.post(environment.URL+"/register",data).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  //Function use to Activate use Account
  activateAccount(key){
    return this._http.get(environment.URL+"/activate?key="+key).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
