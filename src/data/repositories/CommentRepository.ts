import { CommentRepositoryInterface } from "../../domain/contracts/CommentRepositoryInterface";
import { CreateComment, FilterComment } from "../../domain/entities/comment";
import axiosClient from "../datasources/api/AxiosClient";
import { ApiResponse } from "../models/ApiResponse";
import { CommentModel } from "../models/CommentModel";

export const CommentRepository:CommentRepositoryInterface = {

     getCommentByTicketId: async (req: FilterComment)=>{
      const response = await axiosClient.get<ApiResponse<CommentModel[]>>(`tickets/${req.TicketId}/comments`)
      return response.data;
     },
     
     createComment: async (ticketId: string , req: CreateComment)=>{
      const response = await axiosClient.post<ApiResponse<CommentModel>>(`tickets/${ticketId}/comments`,req)
      return response.data;
     },
}