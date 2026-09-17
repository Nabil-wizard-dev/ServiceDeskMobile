import { ApiResponse } from "../../data/models/ApiResponse";
import { CommentModel } from "../../data/models/CommentModel";
import { CreateComment, FilterComment } from "../entities/comment";

export interface CommentRepositoryInterface {
   //  getCommentList:()=>Promise<ApiResponse<CommentModel>>;
    getCommentByTicketId:(req: FilterComment)=>Promise<ApiResponse<CommentModel[]>>;
    createComment:(ticketId: string , req: CreateComment)=>Promise<ApiResponse<CommentModel>>;

}