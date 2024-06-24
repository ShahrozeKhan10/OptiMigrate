import Typography from 'src/components/Typography';

const Contact = () => {
  return (
    <div>
      <div className='py-8 flex justify-center items-center'>
        <Typography
          className='text-center text-[30px] mx-5 font-libreBaskerville lg:text-5xl text-heading-color font-bold'
          variant='title'
        >
          Contact
        </Typography>
      </div>
      <div className='bg-secondary-bg mt-7 w-full p-2'>
        <div className='w-full md:w-7/12 mx-auto'>
          <Typography
            className='text-[21px] font-libreBaskerville lg:text-3xl text-heading-color font-bold my-7'
            variant='title'
          >
            Consultants:
          </Typography>
          <Typography variant='p' className='text-text-color my-7'>
            Are you a skilled legal consultant or experienced immigration lawyer who is passionate
            about helping individuals embark on a lawful journey toward a better life abroad? Join
            us in our mission to provide hope and security through legal immigration pathways. If
            you’re ready to make a meaningful impact, we invite you to share your portfolios and
            details of your past case success rates with us at{' '}
            <span className='text-blue'>consultants@zindabhag.com</span>. Your expertise could be
            the guiding light that transforms lives and writes stories of hope and triumph. We look
            forward to connecting with you and making a difference together.
          </Typography>
          <Typography
            className='text-[21px] font-libreBaskerville lg:text-3xl text-heading-color font-bold my-7'
            variant='title'
          >
            Advisors:
          </Typography>
          <Typography variant='p' className='text-text-color my-7'>
            Are you an individual living in a destination country, well-versed in the local language
            and intricacies of daily life? Your insight and support could be the bridge that eases
            newcomers into their new journey. If you’re passionate about helping others make a
            successful transition and are interested in becoming an advisor with “Zinda Bhag,” we
            welcome you to reach out. Share your background and experiences at{' '}
            <span className='font-bold'>advisors@zindabhag.com</span>, and let’s collaborate in
            turning aspirations into reality while fostering a sense of belonging and support for
            those seeking to start anew. Your guidance could be the difference that sets someone on
            the path to a brighter future.
          </Typography>
          <Typography
            className='text-[21px] font-libreBaskerville lg:text-3xl text-heading-color font-bold my-7'
            variant='title'
          >
            General Inquiries:
          </Typography>
          <Typography variant='p' className='text-text-color my-7'>
            Do you need anything else? We’re here to listen and support you. At “Zinda Bhag,” we
            believe in the power of legal pathways to transform lives. For all general inquiries or
            to explore how “Zinda Bhag” can assist you, reach out to us at{' '}
            <span className='font-bold'>info@zindabhag.com</span>. Your engagement could play an
            integral role in shaping brighter futures and fostering a community of hope and growth.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Contact;
