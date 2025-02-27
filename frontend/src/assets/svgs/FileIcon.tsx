function PageIcon() {
  return (
    <svg width='32' height='40' viewBox='0 0 32 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Page'>
        <path
          id='Page background'
          d='M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z'
          fill='#D92D20'
        />
        <path
          id='Earmark'
          opacity='0.3'
          d='M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z'
          fill='white'
        />
        <text
          x='50%'
          y='70%'
          dominantBaseline='middle'
          textAnchor='middle'
          fill='white'
          fontSize='9px'
          fontWeight='700'
        >
          PDF
        </text>
      </g>
    </svg>
  );
}

export default PageIcon;
