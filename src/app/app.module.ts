import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// Import translate module
import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {HttpInterceptorService} from './services/http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AppService} from './services/app.service';
import {LoaderService} from './services/loader.service';
import {AuthGuardService} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {SchoolService} from './services/school.services';
import { LoadingModule } from 'ngx-loading';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import {LoginComponent} from './views/pages/login.component';
import {RegisterComponent} from './views/pages/register.component';
import {ResetPasswordComponent} from './views/pages/reset-password.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

export function createHttpInterceptor(backend: XHRBackend, options: RequestOptions) {
  return new HttpInterceptorService(backend, options);
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoadingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    HttpModule,
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    ResetPasswordComponent,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: HttpInterceptorService,
    useFactory: createHttpInterceptor,
    deps: [XHRBackend, RequestOptions]
  },
  TranslateService,
  AppService,
  LoaderService,
  AuthGuardService,,
  UserService,
  SchoolService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
