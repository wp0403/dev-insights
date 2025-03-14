import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.contentlayer/generated/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: '0.375rem',
              paddingTop: '0.125rem',
              paddingRight: '0.25rem',
              paddingBottom: '0.125rem',
              paddingLeft: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0.75rem',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
              display: 'block',
            },
            'h1, h2, h3, h4': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            'h1 a, h2 a, h3 a, h4 a': {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 'inherit',
            },
            img: {
              borderRadius: '0.5rem',
            },
            ':not(pre) > code': {
              backgroundColor: 'var(--tw-prose-pre-bg)',
            },
            '.highlighted': {
              backgroundColor: 'rgb(71 85 105 / 0.1)',
              borderRadius: '0.25rem',
              margin: '0 -0.25rem',
              padding: '0.25rem',
            },
            '.word': {
              backgroundColor: 'rgb(71 85 105 / 0.1)',
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
            'code[data-language]': {
              color: '#abb2bf',
            },
            'code[data-language] .token.comment': {
              color: '#5c6370',
              fontStyle: 'italic',
            },
            'code[data-language] .token.string': {
              color: '#98c379',
            },
            'code[data-language] .token.number': {
              color: '#d19a66',
            },
            'code[data-language] .token.keyword': {
              color: '#c678dd',
            },
            'code[data-language] .token.function': {
              color: '#61afef',
            },
            'code[data-language] .token.boolean': {
              color: '#d19a66',
            },
            'code[data-language] .token.operator': {
              color: '#56b6c2',
            },
            'code[data-language] .token.punctuation': {
              color: '#abb2bf',
            },
            '.dark code[data-language]': {
              color: '#abb2bf',
            },
            '.dark code[data-language] .token.comment': {
              color: '#5c6370',
              fontStyle: 'italic',
            },
            '.dark code[data-language] .token.string': {
              color: '#98c379',
            },
            '.dark code[data-language] .token.number': {
              color: '#d19a66',
            },
            '.dark code[data-language] .token.keyword': {
              color: '#c678dd',
            },
            '.dark code[data-language] .token.function': {
              color: '#61afef',
            },
            '.dark code[data-language] .token.boolean': {
              color: '#d19a66',
            },
            '.dark code[data-language] .token.operator': {
              color: '#56b6c2',
            },
            '.dark code[data-language] .token.punctuation': {
              color: '#abb2bf',
            },
          },
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-black': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'grid-white': 'linear-gradient(to right, rgb(255 255 255 / 10%) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 10%) 1px, transparent 1px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;