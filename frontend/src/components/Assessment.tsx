import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthError, ICountry } from 'src/@types';
import { Country } from 'src/api';
import DatePicker from 'src/components/DateOfBirth';
import Dropdown from 'src/components/Dropdown';
import GradientButton from 'src/components/GradientButton';
import ProfessionDropdown from 'src/components/ProfessionDropdown';
import SearchDropdown from 'src/components/SearchWithDropdown';
import Title from 'src/components/Title';
import TitleDescription from 'src/components/TitleDescription';
import Toast from 'src/components/Toast';
import Typography from 'src/components/Typography';
import { Plane } from 'src/constants/images';
import useAssessmentHandler from 'src/hooks/assessmentHandler';

const Assessment = () => {
  const navigate = useNavigate();

  const [options, setOptions] = React.useState<ICountry[]>([]);
  const [countries, setCountries] = React.useState<ICountry[]>([]);
  const [selectedSearchOption, setSelectedSearchOption] = React.useState<string[]>([]);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [baseSelectedOption, setBaseSelectedOption] = React.useState('');
  const [selectedProfessionOpt, setSelectedProfessionOpt] = React.useState<ICountry>();

  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showDropdownErrorMessage, setShowDropdownErrorMessage] = React.useState(false);
  const [showResedenceErrorMessage, setShowResidenceErrorMessage] = React.useState(false);

  const [selectedErrorProfessionOpt, setSelectedErrorProfessionOpt] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dobError, setDobError] = React.useState(false);
  const assessmentHandler = useAssessmentHandler();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [saving, setSaving] = React.useState('');
  const [showErrorSavingMessage, setShowErrorSavingMessage] = React.useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setDobError(false);
  };

  const validateDateOfBirth = () => {
    if (selectedDate === null) {
      setDobError(true);
    } else {
      setDobError(false);
    }
  };

  const getCountryIdsByNames = (countryNames: string): number[] => {
    const countryIds: number[] = [];
    countries.forEach(country => {
      if (countryNames.includes(country?.name!)) {
        countryIds.push(Number(country?.id));
      }
    });
    return countryIds;
  };

  const handleSearchSelect = (newSelectedOptions: string[]) => {
    setSelectedSearchOption(newSelectedOptions);
    setShowErrorMessage(false);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowResidenceErrorMessage(false);
  };

  const handleBaseSelect = (option: string) => {
    setBaseSelectedOption(option);
    setShowDropdownErrorMessage(false);
  };

  const handleOnSubmit = async () => {
    let shouldSubmit = true;
    validateDateOfBirth();

    const _desiredCountries = getCountryIdsByNames(String(selectedSearchOption));
    const _residenceCountry = getCountryIdsByNames(selectedOption);
    const _originCountry = getCountryIdsByNames(baseSelectedOption);

    if (_desiredCountries.length < 1 || _desiredCountries.length > 3) {
      setShowErrorMessage(true);
      shouldSubmit = false;
    }
    if (saving === '') {
      setShowErrorSavingMessage(true);
      shouldSubmit = false;
    }
    if (_residenceCountry === null) {
      setShowResidenceErrorMessage(true);
      shouldSubmit = false;
    }
    if (_originCountry === null) {
      setShowDropdownErrorMessage(true);
      shouldSubmit = false;
    }
    // Why this is string?
    // if (selectedProfessionOpt === '') {
    //   setSelectedErrorProfessionOpt(true);
    //   shouldSubmit = false;
    // }
    if (shouldSubmit) {
      setIsLoading(true);
      try {
        const payload = {
          desiredCountries: _desiredCountries,
          saving: saving,
          residenceCountryId: _residenceCountry,
          originCountryId: _originCountry,
          dob: selectedDate,
          professionId: selectedProfessionOpt?.id!,
        };

        const res = await assessmentHandler(payload);
        const id = res;
        navigate(`/resume?assessmentId=${id}&professionId=${selectedProfessionOpt?.id}`);
      } catch (error) {
        console.error('Error while submitting the form:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getCountries = async () => {
    try {
      const res = await Country.listAll();
      if (Array.isArray(res)) {
        setCountries(res);
        setOptions(res);
      }
    } catch (e) {
      const authError = e as AuthError;
      Toast.fire({ icon: 'error', title: String(authError.error_code) });
    }
  };

  React.useEffect(() => {
    getCountries();
  }, []);

  React.useEffect(() => {
    const checkSubmit = (event: any) => {
      if (event.key === 'Enter') {
        const button = document.getElementById('submitButton');
        button?.click();
      }
    };

    document.addEventListener('keydown', checkSubmit);
    return () => document.removeEventListener('keydown', checkSubmit);
  }, []);

  return (
    <div className='md:w-[500px] w-[305px] mx-auto mt-[150px] px-2'>
      <Title title='Assessment'>
        <Plane className='w-full max-w-[270px] h-auto' />
      </Title>
      <div className='mt-10'>
        <TitleDescription
          titleStyle='text-3xl'
          descriptionStyle='font-normal text-base !text-text-color'
          title='Where do you want to live?'
          description='Please select up to 3 countries'
        />
        <SearchDropdown
          title='Select Countries you are interested in going'
          placeholder='Search country'
          options={options}
          selectedOptions={selectedSearchOption}
          onSelect={handleSearchSelect}
        />
        {showErrorMessage && <p className='text-red-500'>Please select up to 3 countries.</p>}

        <div>
          <Typography className='font-inter text-sm font-medium my-2' variant='p'>
            Enter your current saving amount
          </Typography>
          <input
            type='number'
            placeholder='Enter your savings in $'
            className='px-2 py-2 border-b w-full rounded focus:outline-none'
            value={saving}
            onChange={e => {
              setSaving(e.target.value);
              setShowErrorSavingMessage(false);
            }}
          />
        </div>
        {showErrorSavingMessage && <p className='text-red-500'>Please enter your savings.</p>}

        <DatePicker
          onValidationChange={isValid => setDobError(!isValid)}
          selectedDate={selectedDate}
          onChange={handleDateChange}
        />
        {dobError && <p className='text-red-500 text-md mt-1'>Date of Birth is required.</p>}

        <Dropdown
          title='Where are you currently located?'
          placeholder='Select a country'
          options={options}
          selectedOption={selectedOption}
          onSelect={handleSelect}
        />
        {showResedenceErrorMessage && (
          <p className='text-red-500'>Please select a country for your current location.</p>
        )}

        <Dropdown
          title='Select country of citizenship'
          placeholder='Select a country'
          options={options}
          selectedOption={baseSelectedOption}
          onSelect={handleBaseSelect}
        />
        {showDropdownErrorMessage && (
          <p className='text-red-500'>Please select a your country of citizenship.</p>
        )}

        <ProfessionDropdown
          value={selectedProfessionOpt as ICountry}
          onChange={value => {
            setSelectedProfessionOpt(value);
            setSelectedErrorProfessionOpt(false);
          }}
        />
        {selectedErrorProfessionOpt && <p className='text-red-500'>Please select a Profession.</p>}

        <div className='flex justify-center'>
          <GradientButton
            label={isLoading ? 'Submitting...' : 'Next Step'}
            disabled={isLoading}
            id='submitButton'
            classNames='mt-4 md:px-32'
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </div>
  );
};
export default Assessment;
