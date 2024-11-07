import { useCallback, useEffect, useState } from 'react';
import { DashboardNames } from '../models/RevealServer/dashboard-names';
import { getDashboardNamesList } from '../services/reveal-server';

export const useGetDashboardNamesList = () => {
  const [dashboardNames, setDashboardNames] = useState<DashboardNames[]>([]);

  const requestDashboardNames = useCallback(() => {
    let ignore = false;
    getDashboardNamesList()
      .then((data) => {
        if (!ignore) {
          setDashboardNames(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestDashboardNames();
  }, [requestDashboardNames]);

  return { requestRevealServerDashboardNames: requestDashboardNames, revealServerDashboardNames: dashboardNames, setRevealServerDashboardNames: setDashboardNames };
}
