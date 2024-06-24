import { Link } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';
import Typography from './Typography';

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  btnStyles?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, label, onClick, btnStyles = '', ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge('px-3 py-1 bg-white h-10 mx-3 mt-1 duration-300', btnStyles)}
      {...rest}
    >
      {label || children}
    </button>
  );
};

export default Button;

interface TextWithLinkProps {
  text?: string;
  to: string;
  label?: string;
  className?: string;
  linkClassName?: string;
  emailLabel?: string;
}

const TextWithLink: React.FC<TextWithLinkProps> = ({
  emailLabel,
  label,
  to,
  text,
  className = '',
  linkClassName = '',
}) => {
  // const user = useUser();
  // const isLoggedIn = user?.token;
  // if (isLoggedIn) {
  //   return null;
  // }
  return (
    <div className={className}>
      <Link className={twMerge('text-purple-color font-semibold', linkClassName)} to={to}>
        {emailLabel}
      </Link>
      <Typography variant='h6'>{text}</Typography>

      <Link className={twMerge('text-purple-color font-semibold', linkClassName)} to={to}>
        {label}
      </Link>
    </div>
  );
};

export { TextWithLink };
