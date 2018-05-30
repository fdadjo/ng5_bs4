/**
 * Created by e.emmeni on 28/06/17.
 */

export interface User {
  id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  activated: boolean;
  authorities: string[];
}

export interface UserDTO {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  langKey: string;
  activated: boolean;
  authorities: string[];
}
