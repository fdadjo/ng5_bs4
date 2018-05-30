/**
 * Created by e.emmeni on 30/01/18.
 */

export interface Absence {
  id: number;
  userId: number;
  schoolId: number;
  classId: number;
  unityName: string;
  date: string;
  commentaire: string;
  absence: boolean;
  justify: boolean;
}
