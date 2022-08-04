/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#37404a',
                    dark: '#2e363e',
                    900: '#4B535C',
                    800: '#5F666E',
                    700: '#737980',
                    600: '#878C92',
                    500: '#9BA0A5',
                    400: '#AFB3B7',
                    300: '#C3C6C9',
                    200: '#D7D9DB',
                    100: '#EBECED',
                    50: '#F5F5F6',
                },
                secondary: {
                    DEFAULT: '#FFCB2B',
                    900: '#FFD040',
                    800: '#FFD555',
                    700: '#FFDB6B',
                    600: '#FFE080',
                    500: '#FFE595',
                    400: '#FFEAAA',
                    300: '#FFEFBF',
                    200: '#FFF5D5',
                    100: '#FFFAEA',
                    50: '#FFFCF4',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        function ({addUtilities}) {
            addUtilities({
                '.border-color': {'@apply border-gray-200 dark:border-gray-700': {}}
            })
        }
    ],
}
