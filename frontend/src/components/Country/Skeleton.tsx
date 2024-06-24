import Typography from 'src/components/Typography';

const Skeleton: React.FC<{ name?: string }> = ({ name }) => (
  <div className='w-full mx-auto lg:w-10/12'>
    <div className='ml-10 lg:ml-0 mb-10'>
      <Typography
        variant='title'
        className='font-libreBaskerville text-heading-color text-2xl font-bold'
      >
        Dashboard
      </Typography>
      {name ? (
        <div className='font-inter text-text-color mt-4'>
          <span>Welcome</span>
          <strong> {name}</strong>
        </div>
      ) : null}
    </div>

    <div className='w-full bg-[#FFE09D] h-[300px] rounded-3xl gap-10 grid grid-cols-1 lg:grid-cols-7 my-10 p-10'>
      <div className='h-full bg-[#FFEABB] rounded-lg lg:col-span-2 animate-pulse' />
      <div className='flex items-center gap-5 flex-col lg:col-span-2 animate-pulse'>
        <div className='bg-[#FFEABB] h-10 w-full rounded-lg' />
        <div className='bg-[#FFEABB] h-40 w-full rounded-lg' />
      </div>
      <div className='bg-[#FFEABB] animate-pulse h-full rounded-lg lg:col-span-3' />
    </div>
  </div>
);

export default Skeleton;
