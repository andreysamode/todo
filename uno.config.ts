import { defineConfig, presetUno, presetIcons, presetAttributify, presetWebFonts, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Montserrat',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat"]
    },
    colors: {
      'peach': '#fcc0aa'
    }
  }
});