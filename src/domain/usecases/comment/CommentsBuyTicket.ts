import { CommentRepository } from '../../../data/repositories/CommentRepository';

export async function CommentsByTicket(id: string) {
  const repo = await CommentRepository.getCommentByTicketId({
    TicketId: id,
    page: 1,
    perPage: 10,
  });
  return repo.data.map(comment => {
    return {
      id: comment.id,
      message: comment.message,
      employee: {
        id: comment.employee.id,
        fullName:
          comment.employee.first_name + ' ' + comment.employee.last_name,
        email: comment.employee.email,
        phone: comment.employee.phone,
        position: comment.employee.position,
        createdAt: new Date(comment.employee.created_at),
        updatedAt: new Date(comment.employee.updated_at),
      },
      createdAt: new Date(comment.created_at),
      updatedAt: new Date(comment.updated_at),
    };
  });
}
