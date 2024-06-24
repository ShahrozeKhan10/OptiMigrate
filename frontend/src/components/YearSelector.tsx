// @ts-nocheck
import React from 'react';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface YearSelectorProps {
  onChange: (value: Date | null) => void;
  open?: boolean;
  value?: Date | null;
  disabled?: boolean;
  placeholder?: string;
  minDate?: Date;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  // onChange,
  open,
  value,
  disabled,
  placeholder,
  // minDate,
}) => {
  const dayjsValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={placeholder || 'Select a date'}
        value={dayjsValue}
        onChange={newValue => {
          onChange(newValue ? newValue.toDate() : null);
        }}
        open={open}
        disabled={disabled}
        // minDate={minDate}
        renderInput={(params: any) => <input {...params} placeholder={placeholder} />}
      />
    </LocalizationProvider>
  );
};

export default YearSelector;
