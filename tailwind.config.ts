import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'
import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      maxWidth: {
        'content-detail': 'calc(100% - 160px)',
      },
      backgroundImage: {
        show: 'linear-gradient(180deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .7) 40%, #fff)',
      },
    },
  },
  plugins: [heroui(), flowbite.plugin()],
} satisfies Config
