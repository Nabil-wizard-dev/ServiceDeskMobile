import { ApiResponse } from "../../data/models/ApiResponse";
import { TicketModel } from "../../data/models/TicketModel";
import { AddTicket, FilterTicket } from "../entities/Ticket";

export interface TicketRepositoryInterface{
   getTicketList:(req:FilterTicket)=>Promise<ApiResponse<TicketModel[]>>;
   getTicket:(id:string)=>Promise<ApiResponse<TicketModel>>;
   createTicket: (req: AddTicket) => Promise<ApiResponse<TicketModel>>;
   
}