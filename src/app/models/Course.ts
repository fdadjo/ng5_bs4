/**
 * Created by e.emmeni on 11/07/17.
 */

export interface Course {
  id: number;
  title: string;
  description: string;
  tagKey: string;
  categoryId: number;
  categoryName: string;
  activate: boolean;
}
