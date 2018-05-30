import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from "ng2-translate";
import {AppService} from "./services/app.service";
import {BehaviorSubject, Observable} from "rxjs";
import {LoaderService} from "./services/loader.service";


@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy  {

  public showLoader: boolean;

  public login$;

  constructor(public router: Router, public translate: TranslateService, public appService: AppService, public loaderService: LoaderService) {
     // this language will be used as a fallback when a translation isn't found in the current language
     translate.setDefaultLang('en');

     let userLang = navigator.language.split('-')[0]; // use navigator lang if available
     userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
 
     // the lang to use, if the lang isn't available, it will use the current loader to get them
     translate.use(userLang);
 
 
     this.login$ =  this.appService.login$;
  }

  ngOnInit() {
    
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngOnDestroy() {
    this.login$.unsubscribe();
  }
}
