/**
 * Created by e.emmeni on 18/07/17.
 */

export interface Director {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  activate: boolean;
}
