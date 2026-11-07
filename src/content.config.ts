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

    const imageRowSlide = baseSlide.extend({
      type: z.literal("image-row"),
      image: image(),
      alt: z.string(),
      caption: z.string().optional(),
      bottomImage: image().optional(),
      bottomAlt: z.string().optional(),
      bottomCaption: z.string().optional(),
    });

    const textSlide = baseSlide.extend({
      type: z.literal("text"),
    });

    const textCreditsSlide = baseSlide.extend({
      type: z.literal("text-credits"),
      credits: z.string(),
    });

    return z.discriminatedUnion("type", [
      emptySlide,
      imageSlide,
      imageRowSlide,
      textSlide,
      textCreditsSlide,
    ]);
  },
});

export const collections = { slides };
