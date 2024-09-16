# &lt;sc-video&gt;

A custom element to enhance YouTube and Vimeo embeds.

It does two things:

- Prevent loading of the `iframe` until the play `button` is clicked.
- Show a privacy disclaimer before the embed will be loaded.

## Installation

Available on [npm](https://www.npmjs.com/) as [**@spartan-components/sc-video**](https://www.npmjs.com/package/@spartan-components/sc-video).

```
$ npm install --save @spartan-components/sc-video
```

## Usage

### Script

Import as ES modules:

```js
import { SCVideo } from "@spartan-components/sc-video";
```

Include with a script tag:

```html
<script
  type="module"
  src="./node_modules/@spartan-components/dist/sc-video.js"
></script>
```

Or use minified versions:

```html
<script
  type="module"
  src="./node_modules/@spartan-components/dist/sc-video.min.js"
></script>
```

### CSS

The CSS will:

- Place the backdrop behind the content
- Center the content
- Scale the Iframe to take up the same space as the backdrop

Import the stylesheet inside your css:

```html
<link
  rel="stylesheet"
  href="./node_modules/@spartan-components/dist/sc-video.css"
/>
```

### Example usage

```html
<sc-video
  data-provider="youtube"
  data-id="9Tcy_V8jjf8"
  data-title="Yuuf - In The Sun - Live in Surrey Hills"
>
  <!-- place your fallback content in a `div` with the `[data-content]` attribute -->
  <div data-content>
    <a href="https://www.youtube.com/watch?v=9Tcy_V8jjf8">
      Watch video on YouTube
    </a>
  </div>

  <!-- place a backdrop behind the content by adding the `[data-backdrop]` attribute to a `img` or `picture` element -->
  <img
    data-backdrop
    src="//img.youtube.com/vi/9Tcy_V8jjf8/maxresdefault.jpg"
    alt=""
  />

  <!-- define your template for the playbutton by adding a `template` with the `[data-playbutton]` attribute -->
  <template data-playbutton>
    <button>Play</button>
  </template>

  <!-- define your template for the privacy disclaimer by adding a `template` with the `[data-disclaimer]` attribute AND any `button` element -->
  <template data-disclaimer>
    By watching this video you accept
    <a href="https://policies.google.com/privacy?hl=en">
      Googles Privacy Terms
    </a>
    <button>Accept</button>
  </template>
</sc-video>
```

### Required attributes

The root element (`sc-video`) requires the following attributes:

- `data-provider`: `youtube` or `vimeo`
- `data-id`: ID of the video.
  - For Youtube it's the part after `watch?v=`, so for `https://www.youtube.com/watch?v=9Tcy_V8jjf8` the ID is `9Tcy_V8jjf8`.
  - For vimeo it's usually the number at the end of the URL
- `data-title`: A `title` is added to the iframe to improve accessibility. Use the title of the video on youtube or vimeo.

### Child elements

The following elements are required as a child of `<sc-video>`:

- `<div data-content>` (required): Use this to render some fallback content for non-js environments.
- `<img data-backdrop>` or `<picture data-backdrop>` (optional): Use this to place a backdrop behind the content
- `<template data-playbutton>` (required): A template for the playbutton. Requires a button element as a child:
  - `<button>`
- `<template data-disclaimer>` (required): A template for rendering a privacy disclaimer. Requires a button element as a child:
