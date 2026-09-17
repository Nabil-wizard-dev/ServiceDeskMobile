import { EmployeeModel } from "./EmployeeModel";

export interface CommentModel {
  id: string;
  message: string;
  employee: EmployeeModel;
  created_at: string;
  updated_at: string;
}