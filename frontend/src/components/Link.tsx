import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

interface LinkProps {
  label: string;
  onClick?: () => void;
  href: string;
  containerStyle?: string;
}

const ReactLink: React.FC<LinkProps> = ({ label, href, containerStyle = '' }) => (
  <Link
    className={twMerge(
      'mx-3 !mt-2 lg:mt-0 text-2xl lg:text-base lg:font-normal hover:text-BluePurple cursor-pointer',
      containerStyle,
    )}
    to={href}
  >
    {label}
  </Link>
);

export default ReactLink;
