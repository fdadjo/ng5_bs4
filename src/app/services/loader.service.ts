import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFirstTimeClass: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFirstTimeStud: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFirstTimeTeach: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFirstTimeExam: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFirstTimeLesson: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() { }

  display(value: boolean) {
    this.status.next(value);
  }

}
