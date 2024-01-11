/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./sandbox/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0284c7',
                secondary: '#44403c',
                accent: '#38bdf8',
                success: '#16a34a',
                warning: '#f97316',
                danger: '#dc2626',
            },
        },
    },
    plugins: [forms, typography],
}

