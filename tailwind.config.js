/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            black: "#242424",
            red: "#ff7575",
            blue: "#86b6fc",
            yellow: "#ffcd1f",
            white: "#f5f5f5",
            green: "#2dd998",
        },
        fontFamily: {
            itim: ["itim", "sans-serif"],
        },
    },
    plugins: [],
};
