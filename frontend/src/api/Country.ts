import { AxiosResponse } from 'axios';

import Api from './Axios';
import { getConfig } from '.';

const Country = {
  listAll: async (query = ''): Promise<AxiosResponse> => {
    const endpoint = `http://localhost:8000/country?${query}`;
    console.log("Data",(await Api.get(endpoint)).data.data);
    
    return await Api.get(endpoint);
  },
  getCountryById: async (countryId = '', token = ''): Promise<any | undefined> => {
    const endpoint = `http://localhost:8000/country/${countryId}`;
    const response = await Api.get(endpoint, getConfig(token));
    console.log(response?.data?.data);
    return response?.data?.data;
  },
};

export default Country;
