import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { ICountry } from 'src/@types';

import { useDebouncedCallback } from 'use-debounce';
import { Profession } from '../api';

import useAuth from 'src/hooks/useAuth';

interface DropdownProps {
  title?: string;
  placeholder?: string;
  value: ICountry;
  onChange: (selectedOption: ICountry) => void;
}

const SIZE = 50;

const ProfessionDropdown: React.FC<DropdownProps> = props => {
  const { token } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [professions, setProfessions] = useState<ICountry[]>([]);
  const [query, setQuery] = useState('');
  const [page] = useState(0);
  const [loading, setLoading] = useState(true);

  const list = useDebouncedCallback(({ clear = false, page = 0, size = SIZE } = {}) => {
    Profession.listAll(
      {
        beg: page,
        size: size,
        query: query,
      },
      token,
    )
      .then(res => {
        setProfessions(res?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 1000);

  useEffect(() => {
    list({ clear: true });
  }, [query]);

  useEffect(() => {
    list({ page: page });
  }, [page]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ICountry) => {
    props.onChange(option);
    toggleDropdown();
  };

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
    <div className='relative my-2 dropdown-container'>
      <p className='font-inter text-sm font-medium my-2'>
        Select Profession {/* {title} */}
        {loading ? 'loading... ' : ''}
      </p>
      <div className='relative'>
        <div
          className='w-full border bg-white rounded-md p-2 flex justify-between items-center cursor-pointer'
          onClick={toggleDropdown}
        >
          <span className='text-gray-500'>{props?.value?.name || 'Select a profession'}</span>
          <IoIosArrowDown className={`text-gray-500 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className='absolute max-h-72 overflow-y-auto top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 mt-1'>
            <input
              type='text'
              placeholder='Search...'
              className='px-4 py-2 border-b w-full focus:outline-none'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {professions?.length
              ? professions?.map(option => (
                  <div
                    key={option?.name}
                    className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                    onClick={() => {
                      handleOptionClick(option);
                      setQuery('');
                    }}
                  >
                    {option?.name}
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionDropdown;
