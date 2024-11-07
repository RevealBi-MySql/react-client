import { DashboardNames } from '../models/RevealServer/dashboard-names';
import { FetchApi } from './fetch-api';

const API_ENDPOINT = 'http://localhost:5111';

export async function getDashboardNamesList(): Promise<DashboardNames[]> {
  return await FetchApi.fetchApiResponse<DashboardNames[]>(`${API_ENDPOINT}/dashboards/names`, []);
}
