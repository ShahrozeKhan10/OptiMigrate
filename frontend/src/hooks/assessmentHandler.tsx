import { AuthError } from 'src/@types';
import { AssessmentType } from 'src/api';
import Toast from 'src/components/Toast';

import useAuth from './useAuth';

type payload = {
  desiredCountries: (string | number)[];
  residenceCountryId: string | number[];
  saving: string;
  originCountryId: string | number[];
  dob: Date | null;
  professionId: string | number;
};

const useAssessmentHandler = () => {
  const { token } = useAuth();

  const assessmentHandler = async ({
    desiredCountries,
    saving,
    residenceCountryId,
    originCountryId,
    dob,
    professionId,
  }: payload): Promise<void> => {
    try {
      const response = await AssessmentType.upload(
        {
          desiredCountries,
          saving,
          residenceCountryId,
          originCountryId,
          dob,
          professionId,
        },
        token,
      );
      return response.data.id;
    } catch (e) {
      const authError = e as AuthError;
      Toast.fire({ icon: 'error', title: String(authError.error_code) });
      throw e;
    }
  };

  return assessmentHandler;
};

export default useAssessmentHandler;
