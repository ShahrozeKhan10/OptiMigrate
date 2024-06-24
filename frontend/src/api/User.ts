import Api from './Axios';
import { getConfig } from '.';

const User = {
  getUserProfile: async (token: string) => {
    const endpoint = 'http://localhost:8000/user';

    try {
      const resp = await Api.get(endpoint, getConfig(token));
      const { profession_id, profession_name, ...rest } = resp.data.data;
      return {
        data: {
          data: {
            profession: { id: profession_id, name: profession_name },
            ...rest,
          },
        },
      };
    } catch (e) {
      console.log(e);
    }
    return;
  },

  updateUserProfile: async (data: any, token: string) => {
    const endpoint = 'http://localhost:8000/resume-profile-creation';

    try {
      const resp = await Api.post(endpoint, { ...data, ...getConfig(token) });
      return resp.data.data;
    } catch (e: unknown) {}
  },

  uploadCV: async (token: any, file: string | Blob, type: boolean) => {
    const endpoint = `http://localhost:8000/user/resume?is_linkedin=${type === true ? 'True' : 'False'}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // crossDomain: true,
        // withCredentials: true,
      },
    };

    const formData = new FormData();
    formData.append('resume', file);

    try {
      return await Api.post(endpoint, formData, config);
    } catch (e: unknown) {}
    return;
  },
};

export default User;
