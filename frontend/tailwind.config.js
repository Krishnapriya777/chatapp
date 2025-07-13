export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        text: "var(--color-text)",
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};
