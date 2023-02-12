/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
