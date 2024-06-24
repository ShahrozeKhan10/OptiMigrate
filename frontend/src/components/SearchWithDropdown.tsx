import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import { ICountry } from 'src/@types';

interface DropdownProps {
  title: string;
  placeholder: string;
  options: ICountry[];
  selectedOptions: string[];
  onSelect: (selectedOptions: string[]) => void;
}

const SearchDropdown: React.FC<DropdownProps> = ({
  title,
  placeholder,
  options,
  selectedOptions,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = useMemo(() => {
    return options.filter(option => option.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current !== null && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ICountry) => {
    if (selectedOptions.length < 3 && !selectedOptions.includes(option.name)) {
      onSelect([...selectedOptions, option.name]);
      setSearchTerm('');
    }
  };

  const handleRemoveOption = (option: string) => {
    const updatedOptions = selectedOptions.filter(item => item !== option);
    onSelect(updatedOptions);
  };

  return (
    <div className='relative'>
      <p className='font-inter text-sm font-medium my-2 text-text-color'>{title}</p>
      <div className='relative'>
        <div
          className='w-full border bg-white rounded-md p-2 flex items-center cursor-pointer'
          onClick={toggleDropdown}
        >
          <div className='flex flex-wrap'>
            {selectedOptions.map(option => (
              <div key={option} className='flex items-center bg-gray-200 rounded-lg px-2 mx-1 my-1'>
                {option}
                <IoIosClose
                  fill='gray'
                  className='ml-2 cursor-pointer'
                  onClick={() => handleRemoveOption(option)}
                />
              </div>
            ))}
          </div>
          {selectedOptions.length === 0 && <span className='text-gray-500'>{placeholder}</span>}
        </div>
        {isOpen && (
          <div
            ref={containerRef}
            className='absolute max-h-72 overflow-y-auto  left-0 w-full bg-white border border-gray-300 shadow-lg z-10 '
          >
            <input
              type='search'
              className='px-4 py-2 border-b w-full focus:outline-none'
              placeholder='Search...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {filteredOptions.map(option => (
              <div
                key={option.name}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOptions.includes(option.name) ? 'bg-gray-200' : ''
                }`}
                onClick={() => {
                  handleOptionClick(option);
                  setIsOpen(false);
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

export default SearchDropdown;
