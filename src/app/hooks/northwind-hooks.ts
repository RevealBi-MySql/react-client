import { useCallback, useEffect, useState } from 'react';
import { EmployeesType } from '../models/Northwind/employees-type';
import { getEmployees } from '../services/northwind';

export const useGetEmployees = () => {
  const [employees, setEmployees] = useState<EmployeesType[]>([]);

  const requestEmployees = useCallback(() => {
    let ignore = false;
    getEmployees()
      .then((data) => {
        if (!ignore) {
          setEmployees(data);
          console.log("Employees: ", data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestEmployees();
  }, [requestEmployees]);

  return { requestNorthwindEmployees: requestEmployees, northwindEmployees: employees, setNorthwindEmployees: setEmployees };
}
