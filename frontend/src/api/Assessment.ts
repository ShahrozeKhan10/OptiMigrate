import Api from './Axios';
import { getConfig } from '.';

const AssessmentType = {
  upload: async (data: any, token: string) => {
    const endpoint = `http://localhost:8000/assessment`;
    try {
      const response = await Api.post(endpoint, data, getConfig(token));
      return response.data;
    } catch (e) {}
  },
};

export default AssessmentType;
