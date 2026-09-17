// src/domain/entities/ticket.ts
import { Employee } from './employee';
import { Comment } from './comment';

export enum TicketPriorityEnum  {
  LOW ='low',
  MEDIUM='medium',
  HIGH='high',
  URGENT='urgent'
} ;
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
// export type TicketPriority = typeof TicketPriorityEnum[keyof typeof TicketPriorityEnum];
export type TicketStatus = 'open' | 'in_progress' | 'resolved'|'closed';

export type FilterTicket = {
   status?:TicketStatus,
   priority?:TicketPriority,
   page?:number,
   perPage?:number,
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  reference: string;
  priority?: TicketPriority|string;
  status: TicketStatus;
  employee: Employee;
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
export interface AddTicket {
  subject: string;
  description: string;
  priority?:  TicketPriorityEnum;
  employee_id: string;
}

