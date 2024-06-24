import React from 'react';

interface SocialLoginButtonProps {
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      className='flex justify-center items-center p-2 rounded-lg border border-yellow-500 bg-white shadow-xs w-360 h-11'
      onClick={onClick}
    >
      {icon}
      <span className='ml-2 text-md font-semibold text-gray-700'>{text}</span>
    </button>
  );
};

export default SocialLoginButton;
