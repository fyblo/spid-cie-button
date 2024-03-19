# SPID/CIE button component

Opinionated component to support SPID and CIE login buttons according to the Italian government's standards.

> [!WARNING]  
> the CIE button is still under development

This project is inspired by [italia/spid-sp-access-button](https://github.com/italia/spid-sp-access-button), with a few key differences:

- It is English-first: while the buttons are provided in Italian as well, the language of the project is English, please refrain from asking any question in a language other than that.
- It is written in TypeScript and agnostic to any framework (e.g. no jQuery dependency)
- It is provided as a standard npm package and can be used in any project
- It is designed to be easily customizable via CSS variables (see [Usage](#usage))
- It takes into account modern standards for accessibility and usability (e.g. it is keyboard navigable, screen reader friendly, dark-mode compatible, it scales up and down with the browser's zoom level) and, as such, it does not support Internet Explorer.
- It takes sensible care of performances (e.g. only the required font glyphs are loaded), i.e. the bundle size is approx ~95% smaller than [italia/spid-sp-access-button](https://github.com/italia/spid-sp-access-button).
- It supports SSR, to minimize the Javascript code delivered to the client

## Usage

### Installation

```bash
npm install spid-cie-button
# or
yarn add spid-cie-button
# or
pnpm add spid-cie-button
```

### APIs

The button component exposes the following APIs:

For parts that can be rendered on the server:

```ts
import { renderButton, renderDialog, renderHead } from "spid-cie-button/server";

const head = renderHead(); // returns the style tag, that should be included in the head of the page to avoid layout shifts
const button = renderButton({ lang: "it", type: "spid" }); // returns the HTML of the button element, with the specified language ("it" or "en") and type ("spid" vs "cie")

const rpEndpoint = (idp: string) => `https://example.com/spid?idp=${idp}`;
const dialog = renderDialog({ lang: "it", rpEndpoint }); // returns the HTML of the SPID dialog, with the specified language ("it" or "en") and where the actions are controlled by the `rpEndpoint` function
```

For the interactions client-side, the following API is available:

```ts
import { initDialog } from "spid-cie-button";

initDialog(); // initializes the dialog, making it interactive
```

The following `env` variable adds a Demo IDP to the list of IDPs:

```env
VITE_SPID_DEVELOPMENT_MODE=true
```

### Style Customization

To control the style, the following CSS variables are available:

```css
  --spid-button-background;  /* controls the background of the button */
  --spid-button-color;      /* controls the text color of the button */
  --spid-button-background-hover; /* controls the background of the button on hover */
  --spid-button-background-active; /* controls the background of the button when active/selected */
  --spid-button-color-active; /* controls the text color of the button when active/selected */
  --spid-button-scale; /* controls the scale of the button, change it to increase/reduce the button size (default: 1; numeric value) */

  --spid-base-img-size; /* default: 3rem; controls the size of the SPID and CIE logos */
```

### Example

#### React/Next.js

In a React/Next.js project, you can use the following code to render the button and the dialog:

```ts
// SpidButton.ts, note that it could be a Next.js server component
import { renderButton, renderDialog, renderHead } from "spid-cie-button/server";
import { initDialog } from "spid-cie-button";

export default function SpidButton() {
  const head = renderHead();
  const button = renderButton({ lang: "it", type: "spid" });
  const rpEndpoint = (idp: string) => `https://example.com/spid?idp=${idp}`;
  const dialog = renderDialog({ lang: "it", rpEndpoint });
  useEffect(() => {
    initDialog();
  }, []);
  return (
    <div>
      {head}
      <div>{button}</div>
      <div>{dialog}</div>
      <script>initDialog();</script>
    </div>
  );
}
```

#### Vue/Nuxt 3+

In a Vue/Nuxt 3+ project, you can use the following code to render the button and the dialog:

```vue
<script setup>
import { initDialog } from "spid-cie-button";
import { renderButton, renderDialog, renderHead } from "spid-cie-button/server";

const head = renderHead();
const button = renderButton({ lang: "it", type: "spid" });
const rpEndpoint = (idp: string) => `https://example.com/spid?idp=${idp}`;
const dialog = renderDialog({ lang: "it", rpEndpoint });

const html = head + button + dialog;
// in Nuxt, the server part could be in a /api/ endpoint or in a server component

onMounted(() => initDialog());
</script>

<template>
  <form>
    <section v-html="html">
  </form>
</template>
```

## Development

After cloning run the following commands:

```bash
pnpm install
```

Then, to start the development server:

```bash
pnpm dev
```

To include the demo endpoint in the list of IDPs, you can run the following command:

```bash
VITE_SPID_DEVELOPMENT_MODE=true pnpm dev
```
