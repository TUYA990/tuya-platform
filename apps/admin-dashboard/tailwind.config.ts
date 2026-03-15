import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F77F00',
        success: '#06A77D',
        warning: '#FFB703',
        error: '#D62828',
        background: '#F5F5F5',
        card: '#FFFFFF',
        border: '#E0E0E0',
        text: '#1A1A1A',
        'text-secondary': '#666666',
      },
    },
  },
  plugins: [],
};

export default config;
