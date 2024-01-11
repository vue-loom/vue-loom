/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./sandbox/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#22d3ee',
                secondary: '#44403c',
                accent: '#0891b2',
                success: '#16a34a',
                warning: '#f97316',
                danger: '#dc2626',
            },
        },
    },
    plugins: [],
}

