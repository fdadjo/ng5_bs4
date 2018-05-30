/**
 * Created by e.emmeni on 16/03/18.
 */

export interface Lesson {
  id: number;
  categoryId: number;
  title: string;
  tagKey: string;
  categoryName: string;
  activate: boolean;
  description: string;
}
