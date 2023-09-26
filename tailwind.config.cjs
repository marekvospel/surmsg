/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        system: {
          primary: "#FFC52F",
          dark: {
            900: "#0f0f0f",
            700: "#262626",
          },
          red: "#ff0000",
        },
      },
      spacing: {
        wrap2xl: "220px",
        wrapxl: "180px",
        wraplg: "120px",
        wrapmd: "80px",
      },
      animation: {
        "gradient-x": "gradient-x 2s ease",
        "gradient-y": "gradient-y 2s ease",
        "gradient-xy": "gradient-xy 2s ease",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
