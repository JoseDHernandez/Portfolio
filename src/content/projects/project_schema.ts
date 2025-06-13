import { z } from "astro:content";
export const project_schema = z.object({
  Title: z.string(),
  Date: z.date(),
  Short_description: z.string(),
  Description: z.string(),
  Cover_path: z.string(),
  technologies: z.array(z.string()),
  type: z.string(),
  license: z.string(),
  github_link: z.string().url().optional(),
  demo_link: z.string().url().optional(),
});
