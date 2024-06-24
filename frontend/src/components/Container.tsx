import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge('container mx-auto h-full px-5 md:px-20 xl:px-24', className)}>
      {children}
    </div>
  );
};

export default Container;
