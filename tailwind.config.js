const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@radix-ui/themes/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        primary: "hsl(var(--accent-9))",
        secondary: "hsl(var(--accent-7))",
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
      },
    },
  },
  plugins: [],
};
