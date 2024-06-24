import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

interface Props {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onValidationChange: (isValid: boolean) => void;
}

const DatePicker: React.FC<Props> = ({ selectedDate, onChange, onValidationChange }) => {
  const [error, setError] = useState<string | null>(null);

  const isValidDate = (date: Date | null): boolean => {
    if (!date) {
      setError('Date is required.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleDateChange = (date: Date | null) => {
    const isValid = isValidDate(date);
    onChange(date);
    onValidationChange(isValid);
  };
  const currentYear = new Date();

  return (
    <div className='w-full'>
      <div className='mt-2'>
        <label htmlFor='dob' className='block text-text-color font-medium text-sm font-inter'>
          Date of Birth
        </label>
      </div>
      <div className='relative w-full'>
        <ReactDatePicker
          wrapperClassName='w-full'
          placeholderText='Select date of birth'
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat='dd/MM/yyyy'
          showYearDropdown
          showMonthDropdown
          dropdownMode='scroll'
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          maxDate={currentYear}
          className='w-full h-10 mt-2 pl-2 pr-2 rounded-md border-secondary-bg bg-white text-black placeholder-gray-400 focus:outline-none'
        />
        <div className='absolute inset-y-0 right-0 pr-3 mt-2 flex items-center pointer-events-none'>
          <FaCalendarAlt className='w-5 h-5 items-end text-gray-400' />
        </div>
      </div>
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </div>
  );
};

export default DatePicker;
