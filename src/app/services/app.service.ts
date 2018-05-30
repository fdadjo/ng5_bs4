/**
 * Created by jrk007 on 10/03/17.
 */

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Response} from "@angular/http";
import {Observer, Observable, BehaviorSubject} from "rxjs";
import {HttpInterceptorService} from "./http-interceptor.service";


@Injectable()
export class AppService {

  public login$ = new BehaviorSubject(false);

}

