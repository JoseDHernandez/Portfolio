import { defineCollection, z } from "astro:content";
//Jobs
const work_experience = defineCollection({
  schema: z.object({
    Role: z.string(),
    Where: z.string(),
    Duration: z.string(),
    Description: z.string(),
    Functions: z.array(z.string()),
  }),
});
//Studies
const studies = defineCollection({
  schema: z.object({
    Title: z.string(),
    Duration: z.string(),
    Where: z.string(),
    Image_path: z.string(),
    Position: z.number(),
  }),
});
//Projects
const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      Title: z.string(),
      Date: z.date(),
      Short_description: z.string(),
      Description: z.string(),
      Cover_path: image(),
      Technologies: z.array(z.string()),
      Type: z.string(),
      License: z.string(),
      Github_link: z.string().url().optional(),
      Demo_link: z.string().url().optional(),
    }),
});
export const collections = {
  work_experience,
  studies,
  projects,
};
