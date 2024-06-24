import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { Search as SearchIcon } from 'src/constants/images';

const Search = ({ onFocus, toggleNavbar, setSearchFieldFocused }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const router = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    // router.refresh(); // TODO

    if (newSearchTerm.trim() !== '') {
      localStorage.setItem('searchTerm', newSearchTerm);
    } else {
      localStorage.removeItem('searchTerm');
    }
  };

  useEffect(() => {
    return () => localStorage.removeItem('searchTerm');
  }, []);

  const handleClick = () => {
    const screenSize = 1024;
    if (window.innerWidth < screenSize) {
      toggleNavbar();
      setSearchFieldFocused(false);
    }
  };

  return (
    <div className='flex'>
      <input
        type='text'
        onFocus={onFocus}
        placeholder='Search...'
        value={searchTerm}
        onChange={handleSearchChange}
        className='px-2 h-10 w-48 mt-1 border-secondary-bg rounded focus:outline-none'
      />
      <div onClick={handleClick} className='my-3 -ml-8 cursor-pointer'>
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
