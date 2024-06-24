import Core from "@sk-web-gui/core";
import ContainerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  // important: "#qwertyroot",
  corePlugins: {
    preflight: false,
  },
  blocklist: [],
  theme: {
    extend: {
      spacing: {
        assistanttop: "var(--sk-spacing-assistanttop)",
        assistantbottom: "var(--sk-spacing-assistantbottom)",
        assistantleft: "var(--sk-spacing-assistantleft)",
        assistantright: "var(--sk-spacing-assistantright)",
      },
    },
  },
  plugins: [
    Core({
      cssBase: false,
      colors: [],
    }),
    ContainerQueries,
  ],
};
