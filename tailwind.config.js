module.exports = {
  purge: [
    './views/*.html',
    './views/*.ejs',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

// eslint-disable-next-line max-len
// npx tailwindcss -i ./public/css/tailwind.css -o ./public/css/tailwind.prod.css

// eslint-disable-next-line max-len
// SET NODE_ENV=production npx tailwindcss -i ./public/css/tailwind.css -o ./public/css/tailwind.prod.css --minify

// npx tailwindcss -o ./public/css/tailwind.css --watch