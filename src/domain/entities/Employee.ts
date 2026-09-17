export enum EmployeePosition{
    MANAGER='manager',
    HR="hr",
    DEVELOPER='developer',
    DESIGNER='designer',
    SECRETARY='secretary'
}  

export type FilterEmployee = {
   position?:EmployeePosition,
   page?:number,
   perPage?:number,
}

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}
