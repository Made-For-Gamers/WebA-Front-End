const defaultTheme = require('tailwindcss/defaultTheme')

// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    screens: {
      'sm': '640px', // => @media (min-width: 640px)
      'md': '768px', // => @media (min-width: 768px)
      'lg': '1024px', // => @media (min-width: 1024px)
      'xl': '1280px', // => @media (min-width: 1280px)
      '2xl': '1536px', // => @media (min-width: 1536px)
      '3xl': '1920px', // => @media (min-width: 1920px)
      '4xl': '2560px', // => @media (min-width: 2560px)
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
