import { EmployeeModel } from './employeeModel';
import { CommentModel } from './commentModel';
import { TicketPriority, TicketStatus } from '../../domain/entities/Ticket';

export interface TicketModel {
  id: string;
  subject: string;
  description: string;
  reference: string;
  priority: TicketPriority;
  status: TicketStatus;
  employee: EmployeeModel;
  comments: CommentModel[];
  created_at: string;
  updated_at: string;
}