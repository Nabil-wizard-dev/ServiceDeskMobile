import { EmployeeRepositoryInterface } from "../../domain/contracts/EmployeeRepositoryInterface";
import { FilterEmployee } from "../../domain/entities/employee";
import axiosClient from "../datasources/api/AxiosClient";
import { ApiResponse } from "../models/ApiResponse";
import { CreateEmployeeModel, EmployeeModel } from "../models/EmployeeModel";



export const EmployeeRepository:EmployeeRepositoryInterface = {

   getEmployees:async (req:FilterEmployee)=>{
      
      const vari = await axiosClient.get<ApiResponse<EmployeeModel[]>>('/employees');
      return vari.data;
   },

   getEmployeeById:async (id:string)=>{
      
      const vari = await axiosClient.get<ApiResponse<EmployeeModel>>(`/employees/${id}`);
      return vari.data;
   },

   create:async(req: CreateEmployeeModel)=>{
      const response = await axiosClient.post<ApiResponse<EmployeeModel>>('/employees',req);
      return response.data;

   }
}