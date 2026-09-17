import { EmployeeRepository } from '../../../data/repositories/EmployeeRepository';

export async function EmployeeList() {
  const repo = await EmployeeRepository.getEmployees({
    page: 1,
    perPage: 15,
  });
  return repo.data.map(employee => {
    return {
      id: employee.id,
      fullName: employee.first_name + ' ' + employee.last_name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      createdAt: new Date(employee.created_at),
      updatedAt: new Date(employee.updated_at),
    };
  });
}
