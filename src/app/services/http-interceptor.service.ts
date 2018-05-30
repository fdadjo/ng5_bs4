import { Injectable } from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.getRequestOptionArgs(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs(url, options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.getRequestOptionArgs(url, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.getRequestOptionArgs(url, options));
  }

  getRequestOptionArgs(url, options?: RequestOptionsArgs): RequestOptionsArgs {
    const token = localStorage.getItem('token');
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    if (url.endsWith('api/register') ||
      url.endsWith('/account/reset_password/init') ||
      url.endsWith('/account/reset_password/finish') ||
      url.endsWith('/account/change_password')
    ) {
      // sign up
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'text/plain');

    } else if (url.endsWith('report/detail') ||
      url.endsWith('report/detail/type') ||
      url.endsWith('campaign/all') ||
      url.endsWith('team/all') ||
      url.endsWith('report/all')) {

      options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
      options.headers.append('Accept', 'application/json');
      if (localStorage.getItem('token_jwt') === undefined) {
        localStorage.clear();
        window.location.replace('/');
      } else {
        if (localStorage.getItem('token') !== null) {
          options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_jwt'));
        }
      }

    } else if (url.endsWith('/schools/uploadFiles')) {
      if (localStorage.getItem('token_jwt') === undefined) {
        localStorage.clear();
        window.location.replace('/');
      } else {
        if (localStorage.getItem('token') !== null) {
          options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_jwt'));
        }
      }

    } else {

      // other services
      options.headers.append('Content-Type', 'application/json; charset=utf-8');
      options.headers.append('Accept', 'application/json');
      // check if the user have a valid token
      // console.log(localStorage.getItem('token_jwt'));
      if (localStorage.getItem('token_jwt') === undefined) {
        localStorage.clear();
        window.location.replace('/');
      } else {
        if (localStorage.getItem('token') !== null) {
          options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_jwt'));
        }
      }
    }
    return options;
  }
}
