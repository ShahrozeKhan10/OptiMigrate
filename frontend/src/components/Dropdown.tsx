import React, { useEffect, useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { ICountry } from 'src/@types';

interface DropdownProps {
  title: string;
  placeholder: string;
  options: ICountry[];
  id?: string;
  selectedOption: string;
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  placeholder,
  options,
  id,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ICountry) => {
    onSelect(option.name);
    toggleDropdown();
  };

  const filteredOptions = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const sortedOptions = options
      .filter(option => {
        const optionName = option.name ? option.name.toLowerCase() : '';
        return (
          optionName.startsWith(lowerCaseSearchTerm) || optionName.includes(lowerCaseSearchTerm)
        );
      })
      .sort((a, b) => {
        const aName = a.name ? a.name.toLowerCase() : '';
        const bName = b.name ? b.name.toLowerCase() : '';
        const firstTerm = aName.startsWith(lowerCaseSearchTerm);
        const secondTerm = bName.startsWith(lowerCaseSearchTerm);
        if (firstTerm && !secondTerm) {
          return -1;
        } else if (!firstTerm && secondTerm) {
          return 1;
        }
        return aName.localeCompare(bName);
      });
    return sortedOptions;
  }, [options, searchTerm]);

  const handleDocumentClick = (e: MouseEvent) => {
    if (!e.target) return;
    const targetElement = e.target as HTMLElement;

    if (!targetElement.closest('.dropdown-container')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className='relative my-2 dropdown-container' id={`${id}`}>
      <p className='font-inter text-sm font-medium my-2'>{title}</p>
      <div className='relative'>
        <div
          className='w-full border bg-white rounded-md p-2 flex justify-between items-center cursor-pointer'
          onClick={toggleDropdown}
        >
          <span className='text-gray-500'>{selectedOption || placeholder}</span>
          <IoIosArrowDown className={`text-gray-500 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className='absolute max-h-72 overflow-y-auto top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 mt-1'>
            <input
              type='text'
              placeholder='Search...'
              className='px-4 py-2 border-b w-full focus:outline-none'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {filteredOptions.map(option => (
              <div
                key={option.name}
                className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  handleOptionClick(option);
                  setSearchTerm('');
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
