/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aurora: {
                    1: "#FF6B6B",
                    2: "#FF8E53",
                    3: "#FFC93C",
                    4: "#07F49E",
                    5: "#42C6FF",
                    6: "#A855F7",
                    7: "#EC4899",
                },
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                clash: ['Clash Display', 'Plus Jakarta Sans', 'sans-serif'],
                satoshi: ['Satoshi', 'Inter', 'sans-serif'],
                hand: ['Caveat', 'cursive'],
            },
            animation: {
                'drift': 'drift 10s ease-in-out infinite alternate',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
                'marquee': 'marquee 24s linear infinite',
            },
            keyframes: {
                drift: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
                    '66%': { transform: 'translate(-30px, 40px) scale(0.9)' },
                    '100%': { transform: 'translate(20px, -20px) scale(1.05)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(168,85,247,0.4)' },
                    '50%': { opacity: '0.6', boxShadow: '0 0 40px rgba(168,85,247,0.6)' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
}
