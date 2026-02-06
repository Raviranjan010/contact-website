/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fff0f3',
                    100: '#ffc2d1',
                    200: '#ff8fa3',
                    300: '#ff4d6d', // Main Rose/Pink
                    400: '#c9184a',
                    500: '#a4133c',
                    600: '#800f2f',
                    700: '#590d22',
                },
                background: '#fff0f3', // Very light pink background
            },
            fontFamily: {
                cursive: ['"Dancing Script"', 'cursive'], // We will add this font
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                blob: "blob 7s infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
            },
        },
    },
    plugins: [],
}
