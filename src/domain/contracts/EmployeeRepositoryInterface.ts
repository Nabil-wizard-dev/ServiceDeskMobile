import { ApiResponse } from "../../data/models/ApiResponse";
import { CreateEmployeeModel, EmployeeModel } from "../../data/models/EmployeeModel";
import { FilterEmployee } from "../entities/employee";

export interface EmployeeRepositoryInterface{
   getEmployees:(req:FilterEmployee)=>Promise<ApiResponse<EmployeeModel[]>>;
   getEmployeeById:(id: string)=>Promise<ApiResponse<EmployeeModel>>;
   create: (req: CreateEmployeeModel)=>Promise<ApiResponse<EmployeeModel>>;
   
}