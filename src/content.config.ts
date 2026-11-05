import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const slides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/slides" }),
  schema: ({ image }) => {
    const baseSlide = z.object({
      title: z.string(),
      count: z.number(),
    });

    const emptySlide = baseSlide.extend({
      type: z.literal("empty"),
    });

    const imageSlide = baseSlide.extend({
      type: z.literal("image"),
      image: image(),
      alt: z.string(),
      caption: z.string().optional(),
      rightImage: image().optional(),
      rightAlt: z.string().optional(),
      rightCaption: z.string().optional(), // If only caption is passed, it is the only caption and is on the center
    });
    return z.discriminatedUnion("type", [emptySlide, imageSlide]);
  },
});

export const collections = { slides };
