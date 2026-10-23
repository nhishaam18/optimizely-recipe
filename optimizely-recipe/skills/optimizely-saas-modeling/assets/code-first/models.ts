// Original teaching model. Adapt only after the source/editorial contract is approved.
import { contentType, contract, displayTemplate } from '@optimizely/cms-sdk';

export const MigrationSeo = contract({
  key: 'MigrationSeo', displayName: 'SEO fields',
  properties: {
    seoTitle: { type: 'string', isLocalized: true, maxLength: 70, group: 'seo' },
    seoDescription: { type: 'string', isLocalized: true, maxLength: 180, group: 'seo' },
  },
});

// Owned card values: sharing this type does not share card instances between pages.
export const MigrationCard = contentType({
  key: 'MigrationCard', displayName: 'Card', baseType: '_component',
  properties: {
    heading: { type: 'string', isRequired: true, isLocalized: true, maxLength: 120 },
    image: { type: 'contentReference', allowedTypes: ['_image'] },
    imageAlt: { type: 'string', isLocalized: true },
    destination: { type: 'link', isLocalized: true },
  },
});

export const MigrationCards = contentType({
  key: 'MigrationCards', displayName: 'Cards section', baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', isLocalized: true },
    cards: {
      type: 'array', isRequired: true, minItems: 1, maxItems: 6,
      items: { type: 'component', contentType: MigrationCard },
    },
  },
});

export const MigrationHeroType = contentType({
  key: 'MigrationHero', displayName: 'Hero section', baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    heading: { type: 'string', isRequired: true, isLocalized: true, maxLength: 120 },
    body: { type: 'richText', isLocalized: true, editorSettings: { preset: 'minimal' } },
    image: { type: 'contentReference', allowedTypes: ['_image'] },
    imageAlt: { type: 'string', isLocalized: true },
    ctaLabel: { type: 'string', isLocalized: true },
    ctaUrl: { type: 'url', isLocalized: true },
  },
});

export const MigrationLandingType = contentType({
  key: 'MigrationLanding', displayName: 'Landing experience', baseType: '_experience',
  extends: MigrationSeo,
  properties: {
    title: { type: 'string', isRequired: true, isLocalized: true },
  },
});

export const HeroDisplay = displayTemplate({
  key: 'MigrationHeroDisplay', displayName: 'Hero appearance',
  contentType: 'MigrationHero', isDefault: true,
  settings: {
    theme: {
      editor: 'select', displayName: 'Theme', sortOrder: 0,
      choices: {
        light: { displayName: 'Light', sortOrder: 0 },
        dark: { displayName: 'Dark', sortOrder: 1 },
      },
    },
  },
});
