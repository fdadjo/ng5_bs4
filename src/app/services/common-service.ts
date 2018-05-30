import {Response} from "@angular/http";
import {HttpInterceptorService} from "./http-interceptor.service";

export class CommonService {

  constructor( public _http : HttpInterceptorService) {

  }

  public handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  public extractData(res: Response) {
    let body;
    if (res.text()) { body = res.json() }
    return body;
  }
}
