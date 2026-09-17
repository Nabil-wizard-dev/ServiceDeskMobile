import { TicketRepositoryInterface } from "../../domain/contracts/TicketRepositoryInterface";
import { AddTicket, FilterTicket } from "../../domain/entities/Ticket";
import axiosClient from "../datasources/api/AxiosClient";
import { ApiResponse } from "../models/ApiResponse";
import { TicketModel } from "../models/TicketModel";

export const TicketRepository:TicketRepositoryInterface = {

   getTicketList:async (req:FilterTicket)=>{
      const vari = await axiosClient.get<ApiResponse<TicketModel[]>>('/tickets');
      return vari.data;
   },

   getTicket:async (id:string)=>{
      const vari = await axiosClient.get<ApiResponse<TicketModel>>(`/tickets/${id}`)
      return vari.data;
   },

   createTicket: async (req: AddTicket) => {
    const vari = await axiosClient.post<ApiResponse<TicketModel>>('/tickets', req);
    return vari.data;
  },


};


   