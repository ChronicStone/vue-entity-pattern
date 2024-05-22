import { defineConfig, presetTypography, presetWebFonts } from 'unocss';
import presetUno from '@unocss/preset-uno';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        satoshi: 'Satoshi',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
  ],
});
