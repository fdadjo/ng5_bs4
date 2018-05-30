import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SchoolService} from '../../services/school.services';
import {Pageable} from '../../models/Pageable';
import {PageableCount} from '../../models/PageableCount';
import {LoaderService} from "../../services/loader.service";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public userLogin = {
    'password': '',
    'rememberMe': '',
    'username': ''
  };

  private pageable: Pageable = {
    'page' : 0,
    'size' : PageableCount.SIZE
  };


  public version  =  '';
  public user = {};
  public loading = false;

  constructor(public router: Router, private usersService: UserService, private schoolService: SchoolService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(JSON.stringify(this.userLogin))
    this.loading = true;
    this.usersService.loginUser(this.userLogin).then(
      success => {
        if (localStorage.getItem('token') !== undefined) {
          this.usersService.loadAccount(localStorage.getItem('token')).then(
            response => {
              localStorage.setItem('userId', response.id);
              localStorage.setItem('auth', response.authorities.toString() );

              this.usersService.getSchoolId(response.id, this.pageable).then(
                result => {
                  if (result.content[0] !== undefined) {
                    localStorage.setItem('schoolId', result.content[0].id);
                    localStorage.setItem('picture_link', result.content[0].logoLink);
                  }

                  this.router.navigateByUrl('/');

                  /*switch (response.authorities[1]) {
                    case 'ROLE_ADMIN':
                      this.router.navigateByUrl('/schools');
                      break;
                    case 'ROLE_TEACHER':
                      this.router.navigateByUrl('/classroom');
                      break;
                  }
                  switch (response.authorities[0]) {
                    case 'ROLE_STUDENT':
                      this.router.navigateByUrl('/schools');
                      break;
                    case 'ROLE_DIRECTOR':
                      this.router.navigateByUrl('/classroom');
                      break;
                  }*/
                },
                error => {
                  this.loading = false
                  console.log(error)
                }
              );
            },
            error => {
              this.loading = false
              console.log(error)
            }
          );
        }
        this.userLogin = {
          'username': '',
          'password': '',
          'rememberMe': ''
        };
        this.loading = false
      },
      error => {
        this.loading = false
        console.log(error)
      }
    );
  }

}
