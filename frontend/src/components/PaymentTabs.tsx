import React, { useState } from 'react';

import { Tab } from '@headlessui/react';

interface PaymentTabsProps {
  setAmount: (val: number) => void;
  setLabel: (val: string) => void;
}

const PaymentTabs: React.FC<PaymentTabsProps> = ({ setAmount, setLabel }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Detailed Assessment',
      amount: 29,
    },
    {
      label: 'Summary Assessment',
      amount: 19,
    },
  ];

  const handleTabClick = (index: number, amount: number, label: string) => {
    setActiveTab(index);
    setAmount(amount);
    setLabel(label);
  };

  return (
    <div className=' w-[350px] md:w-[420px] mx-auto'>
      <Tab.Group>
        <Tab.List className='flex justify-center border border-white py-1 rounded-xl'>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={`${
                activeTab === index
                  ? 'bg-white border text-secondary-bg-black  border-gray-300'
                  : 'bg-transparent text-disabled-text'
              } !font-bold text-base rounded-lg px-4 py-2`}
              onClick={() => handleTabClick(index, tab.amount, tab.label)}
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index}>
              <div className='flex justify-center py-5'>
                <div className='flex justify-center items-end'>
                  <p className='font-semibold text-3xl text-heading-color'>{`$${tab.amount}`}</p>
                  <span className='text-lg ml-2 font-normal text-heading-color'>Only</span>
                </div>
                <div className='bg-white rounded-full px-4 py-1 ml-3 flex justify-center items-center'>
                  <p className='text-xs font-medium text-heading-color font-inter'>SAVE 20%</p>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PaymentTabs;
