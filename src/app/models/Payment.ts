/**
 * Created by e.emmeni on 18/07/17.
 */

export interface Payment {
  id: number;
  amount: number;
  date: string;
  type: string;
  userName: string;
  createdBy: string;
  classroomName: string;
  schoolName: string;
  userId: number;
  schoolId: number;
  classroomId: number;
}
