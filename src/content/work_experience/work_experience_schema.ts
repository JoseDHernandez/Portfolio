import { z } from "astro:content";

export const work_experience_schema = z.object({
  Role: z.string(),
  Where: z.string(),
  Duration: z.string(),
  Description: z.string(),
  Functions: z.array(z.string()),
});
