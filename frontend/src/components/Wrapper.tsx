import { twMerge } from 'tailwind-merge';

interface WrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ id, children, className = '' }) => {
  return (
    <div id={id} className={twMerge('w-full', className)}>
      {children}
    </div>
  );
};

export default Wrapper;
