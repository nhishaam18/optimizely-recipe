// Keep beside models.ts for the isolated example.
// After moving models into a project, change this glob to the actual model path.
import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: ['./models.ts'],
  propertyGroups: [{ key: 'seo', displayName: 'SEO', sortOrder: 10 }],
  locale: [],
  // Schema-only example: no bootstrap content or application mutation entries.
});
