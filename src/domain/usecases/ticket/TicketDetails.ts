import { TicketRepository } from "../../../data/repositories/TicketRepository";

export async function TicketDetails(id:string){
   const repo = await TicketRepository.getTicket(id);
   const tk = repo.data;
   return {
      id:tk.id,
      subject:tk.subject,
      status:tk.status,
      description:tk.description,
      reference:tk.reference,
      employee: {
      id: tk.employee.id,
      fullName: tk.employee.first_name + ' ' + tk.employee.last_name,
      email: tk.employee.email,
      phone: tk.employee.phone,
      position: tk.employee.position,
      createdAt: new Date(tk.employee.created_at),
      updatedAt: new Date(tk.employee.updated_at),
    },
    createdAt: new Date(tk.created_at),
    updatedAt: new Date(tk.updated_at),
   };
}