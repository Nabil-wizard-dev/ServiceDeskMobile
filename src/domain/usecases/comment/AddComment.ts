import { CommentRepository } from '../../../data/repositories/CommentRepository';
import { CreateComment } from '../../entities/comment';

export async function AddComment(ticketId: string, req: CreateComment) {
  const repo = await CommentRepository.createComment(ticketId, req);
  return {
    id: repo.data.id,
    message: repo.data.message,
    employee: {
      id: repo.data.employee.id,
      fullName:
        repo.data.employee.first_name + ' ' + repo.data.employee.last_name,
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
