# Presentation template

A simple presentation template in Astro.

[Demo](https://first-uninteresting-username.github.io/presentation-template/)

## Usage

1. Either create a new repo and use this repo as template or fork it
2. Configure the presentation in `src/config.ts`
3. [Create slides](#creating-slides)
4. Enable GitHub Pages and let `Deploy to github pages` run OR build the OCI image

### Configuring

`src/config.ts` contains two settings:

- `theme`: the four colors used by every slide — `surfaceColor` (slide background), `onSurfaceColor` (text on the background), `primaryColor` (navigation button background) and `onPrimaryColor` (navigation button text)
- `pageTitle`: the browser tab title

### Local development

The development environment (Node.js and pnpm) is provided by [devenv](https://devenv.sh). Enter it with `devenv shell` and start the dev server with `pnpm dev`.

### Controls

Press Space to advance to the next slide, Backspace for previous slide.

### Creating slides

Every slide is one markdown file in `src/content/slides`. Every file have two parts: frontmatter (in the `---` block at the top), which contains the settings and text, which is everything else and can be empty.

Every slide needs the following settings in its frontmatter, explanation in parentheses:

```md
---
title: string (slide title)
count: int (which slide this is, starting from 1)
type: string (which type to use, types explained under)
---
```

| type           | What it shows                                  | Extra settings (in the frontmatter)                                                          |
| -------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `text`         | Title and text                                 | none                                                                                         |
| `text-credits` | Text plus a credits line                       | `credits` (required)                                                                         |
| `image`        | One image, or two side by side                 | `image`, `alt` (required); `caption`, `rightImage`, `rightAlt`, `rightCaption` (optional)    |
| `image-row`    | Images stacked on top of each other, plus text | `image`, `alt` (required); `caption`, `bottomImage`, `bottomAlt`, `bottomCaption` (optional) |
| `empty`        | Only title                                     | none                                                                                         |

Adding images

Put images in `src/assets/` and pass the image path (relative to the slide file)

```md
---
title: A cat
count: 4
type: image
image: "../../assets/cat.jpg"
alt: A cat sitting on a chair
---
```

### Footguns

- Deploying to a subpath (for example: `example.com/presentation`) instead of the domain (or subdomain) root: set `ASTRO_BASE=/YOUR/SUBPATH` when building
- Creating 2 slides with the same `count`
- Putting images outside `src/assets/`
- Using image path relative to root

## AI usage

I use codestral for code predictions in IDE.
I use agentic AI for refactors, chore type tasks, testing (with playwright) and explaining things.
My AGENTS.md is also AI written.
Another noteworthy AI written file is src/components/templates/FitText.astro.
