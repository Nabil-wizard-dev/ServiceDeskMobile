import { TicketRepository } from '../../../data/repositories/TicketRepository';
import { AddTicket } from '../../entities/Ticket';

export async function CreateTicket(req: AddTicket) {
  const repo = await TicketRepository.createTicket(req);
  return {
    id: repo.data.id,
    subject: repo.data.subject,
    description: repo.data.description,
    status: repo.data.status,
    reference: repo.data.reference,
    employee: {
      id: repo.data.employee.id,
      fullName: repo.data.employee.first_name + ' ' + repo.data.employee.last_name,
      email: repo.data.employee.email,
      phone: repo.data.employee.phone,
      position: repo.data.employee.position,
      createdAt: new Date(repo.data.employee.created_at),
      updatedAt: new Date(repo.data.employee.updated_at),
    },
    createdAt: new Date(repo.data.created_at),
    updatedAt: new Date(repo.data.updated_at),
  };
}   