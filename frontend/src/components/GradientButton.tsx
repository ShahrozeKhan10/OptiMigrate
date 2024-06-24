import { twMerge } from 'tailwind-merge';

interface GradientButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  classNames?: string;
  id?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  disabled = false,
  onClick,
  id,
  classNames = '',
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      id={`${id}`}
      className={twMerge(
        'flex justify-center font-inter items-center gap-8 self-stretch py-2 px-4 box-shadow-md-white rounded-md bg-zinda-cta-button-gradient text-white text-sm lg:text-xl h-11 w-full',
        classNames,
      )}
      disabled={disabled}
    >
      {disabled ? 'Submitting...' : label}
    </button>
  );
};

export default GradientButton;
