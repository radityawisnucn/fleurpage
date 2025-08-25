/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.ts', // Explicitly specify the config file
    },
    autoprefixer: {},
  },
};

export default config;
