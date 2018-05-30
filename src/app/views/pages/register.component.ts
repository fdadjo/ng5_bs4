import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EmailValidators} from 'ng2-validators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from 'ng2-validators';
import {UserService} from '../../services/user.service';
import {Pageable} from '../../models/Pageable';
import {PageableCount} from '../../models/PageableCount';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

public userAccount = {
  'authorities': [
    'ROLE_USER'
  ],
  'type' : 'founder',
  'email': '',
  'login': '',
  'password': '',
  'phone': '',
  'schoolName': '',
  'userType': 'FOUNDER'
};

private pageable: Pageable = {
  'page' : 0,
  'size' : PageableCount.SIZE
};

email: FormControl = new FormControl('', EmailValidators.normal);

// ceci est mis pour faire le control au cas ou on voudrait specié le mot de passe a entrer
password: FormControl = new FormControl('', Validators.compose([
  PasswordValidators.repeatCharacterRegexRule(4),
  PasswordValidators.alphabeticalCharacterRule(1),
  PasswordValidators.digitCharacterRule(1),
  PasswordValidators.lowercaseCharacterRule(1),
  PasswordValidators.uppercaseCharacterRule(1),
  PasswordValidators.specialCharacterRule(1),
  PasswordValidators.allowedCharacterRule(['a', 'b'])
]));


public confirmPassword = '';
public loading = false;

constructor(public router: Router, private userService: UserService) {}

ngOnInit() {

}

login(data) {
  this.loading = true;
  this.userService.loginUser(data).then(
      success => {
      if (localStorage.getItem('token') !== undefined) {
        this.userService.loadAccount(localStorage.getItem('token')).then(
            response => {
            localStorage.setItem('userId', response.id);

            this.userService.getSchoolId(response.id, this.pageable).then(
                result => {
                if (result.content[0] !== undefined) {
                  localStorage.setItem('schoolId', result.content[0].id);
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
                error =>  {
                  this.loading = false
                  console.log(error)
                }
            );
          },
            error =>  {
              this.loading = false
              console.log(error)
            }
        );
      }

    },
      error =>  {
        this.loading = false
        console.log(error)
      }
  );
  this.loading = false
}

onSubmit() {
  console.log("voici l'objet" + JSON.stringify(this.userAccount))
this.loading = true;
const  userLogin = {
    'password': this.userAccount.password,
    'rememberMe': true,
    'username': this.userAccount.login
  };
  console.log(JSON.stringify(userLogin));
  if (this.userAccount.password === this.confirmPassword) {
    this.userService.signUp(JSON.stringify(this.userAccount)).then(
      success => {

        this.userAccount = {
          'authorities': [
            'ROLE_USER'
          ],
          'type' : 'founder',
          'email': '',
          'login': '',
          'password': '',
          'phone': '',
          'schoolName': '',
          'userType': 'FOUNDER'
        };
        this.confirmPassword = '';

        this.login(userLogin);
      },
      error =>  {
        this.loading = false
        console.log(error)
      }
    );

  } else {
    console.log('Password are not the same !!!!!');
    this.loading = false
  }
}

}
