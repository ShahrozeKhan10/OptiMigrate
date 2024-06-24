import { AxiosResponse } from 'axios';

import Api from './Axios';
import { getConfig } from '.';

const Profession = {
  listAll: async (
    { query = '', beg = 0, size = 50 } = {},
    token: string,
  ): Promise<AxiosResponse | undefined> => {
    const endpoint = `http://localhost:8000/profession?q=${query}&orderBy=asc&page=${beg}&size=${size}`;
    const response = await Api.get(endpoint, getConfig(token));
    return response.data;
  },
};

export default Profession;
