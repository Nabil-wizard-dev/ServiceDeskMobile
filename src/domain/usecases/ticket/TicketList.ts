import { TicketRepository } from '../../../data/repositories/TicketRepository';

export async function TicketList() {
  const repo = await TicketRepository.getTicketList({
    page: 1,
    perPage: 15,
  });
  return repo.data.map(ticket => {
    return {
      id: ticket.id,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      reference: ticket.reference,
      employee: {
        id: ticket.employee.id,
        fullName: ticket.employee.first_name + ' ' + ticket.employee.last_name,
        email: ticket.employee.email,
        phone: ticket.employee.phone,
        position: ticket.employee.position,
        createdAt: new Date(ticket.employee.created_at),
        updatedAt: new Date(ticket.employee.updated_at),
      },
      createdAt: new Date(ticket.created_at),
      updatedAt: new Date(ticket.updated_at),
    };
  });
}
