const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#E6F0FF',
          100: '#BFD3FF',
          200: '#94ABFF',
          300: '#6E86FF',
          400: '#4B63FF',
          500: '#2942FF',
          600: '#1E36E6',
          700: '#1630CC',
          800: '#1128A3',
          900: '#0C2180'
        },
        secondary:{
          50: '#F5F0FF',
          100: '#E6D4FF',
          200: '#D2AFFF',
          300: '#B881FF',
          400: '#9955FF',
          500: '#7C2EFF',
          600: '#6A21E6',
          700: '#591BCC',
          800: '#4B16A3',
          900: '#3C1080'
        }
      }
    }
  }
};

module.exports = config;