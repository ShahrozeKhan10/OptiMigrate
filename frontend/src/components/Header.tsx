import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { UserAvatar } from 'src/components/UserAvatar';
import { LOCAL_USER } from 'src/constants/Auth';
import { Hamburger, Logo } from 'src/constants/images';
import { ROUTES } from 'src/constants/routes';

import Button from './Button';
import Search from './Search';

import React from 'react';
import useAuth from 'src/hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { country } = useParams();
  const { pathname } = location;
  const countryId = country;
  const { isLoggedIn, name, logout } = useAuth();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleJoinClick = () => navigate(ROUTES.LOGIN);

  const [searchFieldFocused, setSearchFieldFocused] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNavbar = () => {
    setNavbarOpen(false);
  };

  const handleSearchFieldFocus = () => {
    setSearchFieldFocused(true);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    localStorage.removeItem(LOCAL_USER);
    toggleDropdown();
  };
  const isEmailPage = pathname === ROUTES.EMAIL;

  // Custom hook for handling clicks outside an element
  function useClickOutside(ref: any, callback: () => void) {
    React.useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref, callback]);
  }

  useClickOutside(dropdownRef, () => {
    setDropdownOpen(true);
  });

  const showSearch = useMemo(() => {
    return pathname === ROUTES.COUNTRIES && !countryId;
  }, [pathname, countryId]);

  return (
    <nav
      className={classNames('bg-navbar-bg p-3 flex items-center justify-between relative', {
        open: navbarOpen,
      })}
    >
      {navbarOpen ? (
        <div className='fixed inset-0 bg-primary-bg h-full z-40 slide-in'>
          <button
            onClick={() => {
              setNavbarOpen(false);
            }}
            className='cursor-pointer absolute right-4 top-7'
          >
            <AiOutlineMenuUnfold className='h-7 w-7' />
          </button>
        </div>
      ) : (
        <div className='fixed bg-primary-bg '>
          <button
            onClick={() => {
              setNavbarOpen(false);
            }}
            className='cursor-pointer absolute right-4 top-7'
          >
            <AiOutlineMenuUnfold className='h-7 w-7' />
          </button>
        </div>
      )}

      <div className='container mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start'>
          <Link to={ROUTES.HOME}>
            <Logo />
          </Link>

          <div className='flex lg:hidden gap-2'>
            <button
              className='p-3 hover:bg-gray-50/40 transition-all text-white cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Hamburger />
            </button>

            {isLoggedIn ? <UserAvatar name={name} onClick={toggleDropdown} /> : null}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className='absolute right-0 mt-12 w-36 bg-white border rounded-lg shadow-lg'
              >
                <ul>
                  <li onClick={handleLogout} className='p-2 cursor-pointer hover:bg-slate-100'>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames('lg:flex flex-grow items-center z-50', {
            flex: navbarOpen,
            hidden: !navbarOpen,
          })}
          id='example-navbar-danger'
        >
          <div
            className={classNames('flex  flex-col lg:flex lg:flex-row list-none lg:ml-auto', {
              'w-full': navbarOpen,
            })}
          >
            <div
              className='flex flex-col gap-5 my-28 lg:my-0 lg:flex-row items-center mt-2 lg:mt-0 slide-in lg:!animate-none'
              onClick={() => {
                if (!searchFieldFocused) {
                  setNavbarOpen(false);
                }
              }}
            >
              {!isLoggedIn ? (
                <>
                  {isEmailPage ? null : (
                    <>
                      <Link
                        to={ROUTES.NEED}
                        className={pathname === ROUTES.NEED ? 'underline' : 'hover:underline'}
                      >
                        Need of Time
                      </Link>
                      <Link
                        to={ROUTES.STORY}
                        className={pathname === ROUTES.STORY ? 'underline' : 'hover:underline'}
                      >
                        Our Story
                      </Link>
                      <Link
                        to={ROUTES.COUNTRIES}
                        className={pathname === ROUTES.COUNTRIES ? 'underline' : 'hover:underline'}
                      >
                        Countries
                      </Link>
                    </>
                  )}
                  {pathname === ROUTES.COUNTRIES ? (
                    <Search
                      onFocus={handleSearchFieldFocus}
                      toggleNavbar={toggleNavbar}
                      setSearchFieldFocused={setSearchFieldFocused}
                    />
                  ) : null}
                  <Button
                    btnStyles='border-secondary-bg rounded mt-3 lg:mt-0 px-4'
                    label='Login'
                    onClick={handleJoinClick}
                  />
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.DASHBOARD}
                    className={
                      pathname === ROUTES.DASHBOARD
                        ? 'underline'
                        : 'hover:underline active:underline'
                    }
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={ROUTES.NEED}
                    className={
                      pathname === ROUTES.NEED ? 'underline' : 'hover:underline active:underline'
                    }
                  >
                    Need of Time
                  </Link>
                  <Link
                    to={ROUTES.STORY}
                    className={
                      pathname === ROUTES.STORY ? 'underline' : 'hover:underline active:underline'
                    }
                  >
                    Our Story
                  </Link>
                  {/* <Link
                    to={ROUTES.ASSESSMENT}
                    className={
                      pathname === ROUTES.ASSESSMENT
                        ? 'underline'
                        : 'hover:underline'
                    }
                  >
                    Assessment
                  </Link> */}
                  <Link
                    to={ROUTES.COUNTRIES}
                    className={
                      pathname === ROUTES.COUNTRIES
                        ? 'underline'
                        : 'hover:underline active:underline'
                    }
                  >
                    Countries
                  </Link>

                  {showSearch ? (
                    <Search
                      onFocus={handleSearchFieldFocus}
                      toggleNavbar={toggleNavbar}
                      setSearchFieldFocused={setSearchFieldFocused}
                    />
                  ) : null}

                  <div className='relative group hidden lg:block'>
                    <UserAvatar name={name} onClick={toggleDropdown} />
                    {dropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className='absolute right-0 mt-2 w-48 bg-white overflow-hidden border rounded-lg shadow-lg'
                      >
                        <ul>
                          <li
                            onClick={handleLogout}
                            className='p-2 cursor-pointer hover:bg-slate-100'
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
