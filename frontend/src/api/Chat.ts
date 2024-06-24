import Api from './Axios';
import { getConfig } from '.';

const Chats = {
  getDataFromResume: async (data: FormData, token: string) => {
    const endpoint = 'http://localhost:8000/chat/get-resume-data';
    return await Api.post(endpoint, data, getConfig(token));
  },
};

export default Chats;
