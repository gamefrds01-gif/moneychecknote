import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      'gov-support', 'refund', 'tax', 'money-guide',
    ]),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    hook: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['ko']).default('ko'),
  }),
});

export const collections = { blog };
