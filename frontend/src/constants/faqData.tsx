const faqs = {
  FAQS: 'Welcome to the Optimigrate FAQ section. Here, we address some common questions to help you better understand our services.',
  FAQS_QUESTIONS: [
    {
      question: 'How can I get assistance from your support team?',
      answer: ({ open }: { open: boolean }) => (
        <div
          className={`px-4 mt-2 overflow-hidden text-lg leading-7 text-slate-400 transition-all duration-700 ease-in-out lg:mt-0 ${
            open ? 'max-h-screen pb-6' : 'max-h-0'
          }`}
        >
          Our dedicated support team is here to help you. You can reach out to us via email at support@optimigrate.com or contact us through our website's live chat feature. We're available to assist you with any questions or concerns you may have.
        </div>
      ),
    },
    {
      question: 'What are the benefits of joining the Optimigrate community?',
      answer: ({ open }: { open: boolean }) => (
        <div
          className={`px-4 mt-2 overflow-hidden text-lg leading-7 text-slate-400 transition-all duration-700 ease-in-out lg:mt-0 ${
            open ? 'max-h-screen pb-6' : 'max-h-0'
          }`}
        >
          Joining the Optimigrate community grants you access to a wealth of resources and support to enhance your migration journey. As a member, you'll receive exclusive updates, personalized recommendations, networking opportunities, and assistance from our expert team. Plus, you'll be part of a supportive community of like-minded individuals who share your goals and experiences.
        </div>
      ),
    },
    {
      question: 'How does Optimigrate simplify the migration process?',
      answer: ({ open }: { open: boolean }) => (
        <div
          className={`px-4 mt-2 overflow-hidden text-lg leading-7 text-slate-400 transition-all duration-700 ease-in-out lg:mt-0 ${
            open ? 'max-h-screen pb-6' : 'max-h-0'
          }`}
        >
          Optimigrate streamlines the migration process by offering comprehensive services and resources tailored to your needs. Our platform provides personalized guidance, step-by-step assistance, and access to valuable tools to simplify every aspect of your migration journey. From visa applications to job placement support, language training, and cultural integration, we're here to make your transition as smooth and stress-free as possible.
        </div>
      ),
    },
    {
      question: 'What types of services does Optimigrate offer?',
      answer: ({ open }: { open: boolean }) => (
        <div
          className={`px-4 mt-2 overflow-hidden text-lg leading-7 text-slate-400 transition-all duration-700 ease-in-out lg:mt-0 ${
            open ? 'max-h-screen pb-6' : 'max-h-0'
          }`}
        >
          Optimigrate offers a wide range of services to meet your migration needs. Our services include visa consultation and application support, job placement assistance, language proficiency training, cultural orientation programs, and relocation logistics coordination. Whether you're an individual seeking to immigrate or a company relocating employees internationally, we provide tailored solutions to ensure a successful migration experience.
        </div>
      ),
    },
  ],
};

export default faqs;
