# [WIP] SPID/CIE button component

Minimal component to support SPID and CIE login buttons according to the Italian government's standards.

This project is inspired by [italia/spid-sp-access-button](https://github.com/italia/spid-sp-access-button), with a few key differences:

- It is English-first: while the buttons are provided in Italian as well, the language of the project is English, please refrain from asking any question in a language other than that.
- It is written in TypeScript and agnostic to any framework (e.g. no jQuery dependency)
- It is provided as a standard npm package and can be used in any project
- It is designed to be easily customizable via CSS variables (see [Usage](#usage))
- It takes into account modern standards for accessibility and usability (e.g. it is keyboard navigable, screen reader friendly, dark-mode compatible, it scales up and down with the browser's zoom level) and, as such, it does not support Internet Explorer.
- It takes sensible care of performances (e.g. only the required font glyphs are loaded), i.e. the bundle size is approx ~90% smaller than [italia/spid-sp-access-button](https://github.com/italia/spid-sp-access-button).
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

### Basic Usage (SSR)

```ts
// todo
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
