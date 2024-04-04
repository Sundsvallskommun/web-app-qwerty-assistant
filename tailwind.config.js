/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  important: "#qwertyroot",
  corePlugins: {
    // preflight: false,
  },
  theme: { extend: {} },
  plugins: [
    //require('@tailwindcss/typography'),
    // require("@tailwindcss/forms"),
    require("@sk-web-gui/core")({
      cssBase: true,
    }),
  ],
  presets: [
    {
      theme: {
        extend: {
          backgroundImage: {
            assistant: "url('../assets/assistanticon.png')",
          },
        },
      },
    },
  ],
};
