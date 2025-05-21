// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/weather-app-react-great/', // <== set this to your repo name!
  plugins: [react()],
});

