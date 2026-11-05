import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const slides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/slides" }),
  schema: z.object({
    title: z.string(),
    count: z.number(),
    type: z.enum(["default"]),
  }),
});

export const collections = { slides };
