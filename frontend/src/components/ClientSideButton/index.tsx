import React from 'react';
import useAuth from 'src/hooks/useAuth';

interface IClientSideButton extends React.ComponentPropsWithoutRef<'button'> {
  text: string;
  icon?: React.ReactNode;
}

const ClientSideButton: React.FC<IClientSideButton> = ({ onClick, text, icon, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? (
    <button
      className='gradient-button3 flex items-center rounded-lg py-3 px-4 text-white mt-2 sm:mt-0'
      onClick={onClick}
      {...rest}
    >
      {text}
      {icon ? icon : null}
    </button>
  ) : null;
};

export default ClientSideButton;
