import { defineCollection } from "astro:content";
import { work_experience_schema } from "./work_experience/work_experience_schema";
import { study_schema } from "./studies/study_schema.ts";
import { project_schema } from "./projects/project_schema.ts";
const work_experience = defineCollection({
  schema: work_experience_schema,
});
const studies = defineCollection({
  schema: study_schema,
});
const projects = defineCollection({
  schema: project_schema,
});
export const collections = {
  work_experience,
  studies,
  projects,
};
