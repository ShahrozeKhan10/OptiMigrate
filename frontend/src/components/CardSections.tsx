import classNames from 'classnames';
import React, { useState } from 'react';

import Typography from 'src/components/Typography';

interface Card {
  id: number;
  imageUrl: string;
  title: string;
}

interface CardSectionProps {
  cards: Card[];
  cardType: string;
}

const CardSection: React.FC<CardSectionProps> = ({ cards, cardType }) => {
  const initialCardsToShow = 3;
  const [cardsToShow] = useState(initialCardsToShow);

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex items-center justify-between mt-5 mx-3'>
        <Typography variant='subTitle2' className='font-medium font-inter'>
          {cardType}
        </Typography>
      </div>

      <div
        className={classNames('flex flex-wrap justify-center md:justify-between my-1', {
          'overflow-x-scroll': cardsToShow !== initialCardsToShow,
        })}
      >
        {cards?.slice(0, cardsToShow).map(card => (
          <div
            key={card.id}
            className={classNames('w-full md:w-1/2 lg:w-1/3 p-2', {
              'flex-shrink-0': cardsToShow !== initialCardsToShow,
            })}
          >
            <div className=''>
              <iframe
                title={card.title}
                src={card.imageUrl}
                width='100%'
                height='200'
                className='rounded-lg'
                allowFullScreen
              ></iframe>
            </div>
            <div className='pt-1'>
              <div className='font-libreBaskerville text-xl'>{card.title}</div>
              {/* <Typography
                variant='subTitle'
                className='text-gray-700 text-base'
              >
                {card.content}
              </Typography> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
