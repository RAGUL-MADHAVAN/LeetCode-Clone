/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'lc-bg': '#1a1a1a',
                'lc-bg-card': '#282828',
                'lc-bg-hover': '#333333',
                'lc-bg-input': '#3e3e3e',
                'lc-border': '#404040',
                'lc-text': '#eff1f6',
                'lc-text-secondary': '#9b9da0',
                'lc-accent': '#ffa116',
                'lc-accent-hover': '#ffb84d',
                'lc-easy': '#00b8a3',
                'lc-medium': '#ffc01e',
                'lc-hard': '#ff375f',
                'lc-accepted': '#2cbb5d',
                'lc-wrong': '#ef4743',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
