import CommunityLeft from 'src/components/CommunityLeft';
import CommunityRight from 'src/components/CommunityRight';

const Community: React.FC = () => {
  return (
    <section className='bg-dark-blue text-white -mt-2 2xl:-mt-3'>
      <div className='container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between'>
        {/* <CommunityRight />
        <CommunityLeft /> */}
      </div>
    </section>
  );
};

export default Community;
