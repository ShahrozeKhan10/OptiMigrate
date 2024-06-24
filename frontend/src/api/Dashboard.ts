import Api from './Axios';
import { getConfig } from '.';
import { IDashboard } from 'src/@types/Dashboard';

const Dashboard = {
  getData: async (
    token: string,
  ): Promise<{
    data: IDashboard;
    error: boolean;
    error_code: number | string;
  }> => {
    const endpoint = `http://localhost:8000/assessment/user`;
    const response = await Api.get(endpoint, getConfig(token));
    return response.data;
  },
};

export default Dashboard;
