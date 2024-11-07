import { EmployeesType } from '../models/employees-type';

export async function getEmployees(): Promise<EmployeesType[]> {
  const response = await fetch('../../static-data/employees-type.json');
  if (!response.ok) {
    return Promise.resolve([]);
  }
  return response.json();
}
