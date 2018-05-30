/**
 * Created by e.emmeni on 06/07/17.
 */

export interface Teacher {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone1: string;
  phone2: string;
  fatherName: string;
  motherName: string;
  discount: number;
  resetDate: string;
  placeOfBirth: string;
  birthday: string;
  activate: boolean;
}
