import { z } from "astro:content";
export const project_schema = z.object({
  Title: z.string(),
  Date: z.date(),
  Short_description: z.string(),
  Description: z.string(),
  Cover_path: z.string(),
  Technologies: z.array(z.string()),
  Type: z.string(),
  License: z.string(),
  Github_link: z.string().url().optional(),
  Demo_link: z.string().url().optional(),
});
