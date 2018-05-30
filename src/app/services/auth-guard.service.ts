import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, ActivatedRoute} from '@angular/router';
import {AppService} from './app.service';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute, private app : AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token_jwt') ) {
      const jwt = new JwtHelper();
      if (!jwt.isTokenExpired(localStorage.getItem('token_jwt'))) {
        this.app.login$.next(true);
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.app.login$.next(false);
    return false;
  }

}
