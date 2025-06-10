import { z } from "astro:content";
export const study_schema = z.object({
  Title: z.string(),
  Duration: z.string(),
  Where: z.string(),
  Image_path: z.string(),
  Position: z.number(),
});
