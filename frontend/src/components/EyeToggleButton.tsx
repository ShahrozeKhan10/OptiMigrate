import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface ToggleButtonProps {
  show: boolean;
  toggle: () => void;
}

const ToggleButtonComponent = ({ show, toggle }: ToggleButtonProps) => {
  return (
    <div className='absolute top-9 right-2 -translate-y-5 '>
      <button
        type='button'
        onClick={toggle}
        className='border-none bg-transparent cursor-pointer p-0'
      >
        {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
      </button>
    </div>
  );
};

export default ToggleButtonComponent;
