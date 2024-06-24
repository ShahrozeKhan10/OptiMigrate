import { useNavigate } from 'react-router-dom';

import { MdOutlineNavigateNext } from 'react-icons/md';

import ClientSideButton from 'src/components/ClientSideButton';
// import JoinWaitlist from 'src/components/JoinWaitlist';
import Typography from 'src/components/Typography';
import { Boat, Cart, Plane } from 'src/constants/images';
import { ROUTES } from 'src/constants/routes';

const Head: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleWaitList = () => {
  //   setIsModalOpen(true);
  // };

  const handleButton = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <div className='h-full w-full'>
      <div className='flex justify-center items-center flex-col'>
        <Typography
          className='text-center font-bold font-libreBaskerville md:w-7/12 w-full md:!text-6xl mt-10 text-2xl text-heading-color leading-10'
          variant='heading'
        >
          Let AI decide where you live, work, study & Grow
        </Typography>
        <Typography className='text-center my-4 text-text-color font-inter' variant='subTitle'>
          Get rid of travel agents, go abroad safely
        </Typography>
        <div className='flex justify-center items-center flex-col sm:flex-row my-2'>
          {/* <SubscribeSearch /> */}
          <ClientSideButton
            text='Get Started'
            // onClick={handleWaitList}
            onClick={handleButton}
            icon={<MdOutlineNavigateNext color='white' className='ml-2' size={20} />}
          />
          {/* {isModalOpen && (
            <JoinWaitlist onClose={closeModal} isModalOpen={isModalOpen} />
          )} */}
          {/* {!isLoggedIn ? (
            <button
              className='gradient-button3 flex items-center rounded-lg py-4 px-5 text-white mt-2 sm:mt-0'
              onClick={handleWaitList}
            >
              Join Community
              <MdOutlineNavigateNext color='white' className='ml-2' size={20} />
            </button>
          ) : null} */}
        </div>
      </div>
      <div className='relative w-full'>
        <div className='bgSand bgSand2 bgSand3 bgSand4 bgSand5 bgSand6 bgSand7 bgSand8 bgSand9 bgSand10 bgSand11 bgSand12 bgSand13 bgSand14 bgSand15 bgSand16 bgSand17 bgSand18 bgSand19 bgSand20 bgSand21 bgSand22 bgSand23 bgSand24 bgSand25 bgSand26 bgSand27 bgSand28 bgSand29 bgSand30 bgSand31 bgSand32 bgSand33 bgSand34 bgSand35 bgSand36 bgSand37 mt-10 bg-bgSand xl:h-[60vh] xl:bg-center bg-cover 2xl:bg-cover bg-no-repeat h-full w-full '>
          <div className='relative z-10 h-[100%] w-[100%]'>
            <div className=' boat w-[150px] sm:w-[170px] md:w-[250px] lg:w-[340px] xl:w-[420px] 2xl:w-[460px] ml-0 2xl:ml-8 3xl:w-[700px] absolute bottom-2 sm:bottom-4 left-[35%]'>
              <Boat />
            </div>

            <div className='airplane absolute right-32 sm:right-64 lg:right-[30%] -top-6 sm:-top-4 w-[100px] sm:w-[220px] lg:w-[240px] xl:w-[280px] 2xl:w-[400px]'>
              <Plane />
            </div>

            <div className='cart absolute -left-3 sm:left-[-3%] md:left-[-2%] lg:left-[2%] 2xl:left-[-2%] w-[110px] sm:w-[180px] md:w-[250px] lg:w-[270px] xl:w-[340px] 2xl:w-[400px] bottom-20 lg:bottom-28 3xl:bottom-60'>
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
