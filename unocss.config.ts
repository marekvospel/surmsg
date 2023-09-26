import { defineConfig, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno()
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
    colors: {
      system: {
        primary: "#FFC52F",
        dark: {
          900: "#0f0f0f",
          700: "#262626",
        },
        red: "#ff0000",
      },
      white: "#ffffff",
      black: "#000000"
    }
  }
})