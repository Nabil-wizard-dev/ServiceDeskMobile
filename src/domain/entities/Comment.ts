// src/domain/entities/comment.ts
import { Employee } from './employee';

export type FilterComment = {
  TicketId:string,
   page?:number,
   perPage?:number,
}


export interface Comment {
  id: string;
  message: string;
  employee: Employee;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateComment{
  message:string;
  employee_id:string;

}