/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const fontSize = {
  title: '2.5rem',
};

const colors = {
  'primary-bg': '#F6E7EA',        /* Soft Pink */
  'primary-div-bg': '#FCEFEF',    /* Pale Pink */
  'primary-secondary': '#FFB6C1', /* Light Pink */
  'bg-card': '#FFFFFF',           /* White */
  'secondary-bg-black': '#394761', /* Dark Slate Blue */
  'navbar-bg': '#F6E7EA',         /* Soft Pink */
  'heading-color': '#35424F',     /* Dark Slate Gray */
  'text-color': '#475C7A',         /* Cadet Blue */
  'light-gray': '#D3D3D3',        /* Light Gray */
  'light-gray-200': '#F0F0F0',    /* Light Gray */
  'dark-gray': '#475C7A',         /* Cadet Blue */
  'footer-text-color': '#35424F',  /* Dark Slate Gray */
  'purple-color': '#800080',      /* Purple */
  'disabled-text': '#6E7C8F',      /* Cadet Blue */
  'blue': '#3A4DD5',              /* Dodger Blue */
  'gray': {
    200: '#AEC9E5',               /* Light Steel Blue */
    600: '#35424F',               /* Dark Slate Gray */
    700: '#1F2933',               /* Midnight Blue */
  },
  'primary': '#35424F',           /* Dark Slate Gray */
  'violet': '#5F4B8B',            /* Slate Blue Violet */
  'purple-black': '#323944',      /* Dark Midnight Blue */
  'gray-200': '#DAE4F2',          /* Azure Radiance */
  'gray-600': '#475C7A',          /* Cadet Grey */
  'dark-blue': '#0E1421',         /* Dark Midnight Blue */
  'secondary-bg': '#D3D3D3',       /* Light Gray */
};

module.exports = {
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '16px' },
      });
    }),
  ],
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px',
        // => @media (min-width: 2000px) { ... }
      },
      animation: {
        'spin-slow': 'spin 17s linear infinite',
      },
      colors,
      fontSize, // Optional (Subject to change)
      width: {
        360: '360px',
      },
      height: {
        11: '2.75rem', // 44px
      },
      boxShadow: {
        'md-white': '0px 1px 2px 0px rgba(29, 29, 27, 0.15)',
        xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      },
      backgroundImage: {
        // add background image here. eg:
        // 'hero-pattern': "url('#')",
        // 'footer-texture': "url(#')",
        bgSand: 'url(src/assets/images/bgAi.jpg)',
        // bgSand: 'url(src/assets/svgs/group15.svg)',
        // footerbg: 'url(src/assets/images/dustbg.png)',
        'zinda-cta-button-gradient': 'linear-gradient(106deg, #FFB6C1 0%, #35424F 100%)',
      },
      backgroundColor: {
        'base-white': 'var(--base-white, #FFF)',
        circle: 'var(--primary-600, #7F56D9)',
      },
      fontFamily: {
        libreBaskerville: ['var(--font-libreBaskerville)', 'ui-sans-serif', 'system-ui'],
        inter: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
};
