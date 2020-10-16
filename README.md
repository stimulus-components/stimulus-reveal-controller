# Stimulus Reveal Controller

[![](https://img.shields.io/npm/dt/stimulus-reveal-controller.svg)](https://www.npmjs.com/package/stimulus-reveal-controller)
[![](https://img.shields.io/npm/v/stimulus-reveal-controller.svg)](https://www.npmjs.com/package/stimulus-reveal-controller)
[![](https://github.com/stimulus-components/stimulus-reveal-controller/workflows/Lint/badge.svg)](https://github.com/stimulus-components/stimulus-reveal-controller)
[![](https://github.com/stimulus-components/stimulus-reveal-controller/workflows/Test/badge.svg)](https://github.com/stimulus-components/stimulus-reveal-controller)
[![](https://img.shields.io/github/license/stimulus-components/stimulus-reveal-controller.svg)](https://github.com/stimulus-components/stimulus-reveal-controller)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c21b3ca7-40fa-4de3-aad5-56dbc343ace6/deploy-status)](https://stimulus-reveal-controller.netlify.com)

## Getting started

A Stimulus controller to toggle a class on one or multiple items to show or hide them.

## Installation

```bash
$ yarn add stimulus-reveal-controller
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Reveal from "stimulus-reveal-controller"

const application = Application.start()
application.register("reveal", Reveal)
```

## Usage

### Toggle
```html
<div data-controller="reveal" data-reveal-hidden-class="hidden">
  <button data-action="click->reveal#toggle" type="button" class="btn">
    Toggle me!
  </button>

  <p data-target="reveal.item" class="hidden mt-4">Hey 👋</p>
  <p data-target="reveal.item" class="hidden mt-4">You can have multiple items</p>
</div>
```

### Show
```html
<div data-controller="reveal">
  <button data-action="click->reveal#show" type="button" class="btn">
    Show me!
  </button>

  <p data-target="reveal.item" class="hidden mt-4">Hey 👋</p>
</div>
```

### Hide
```html
<div data-controller="reveal">
  <button data-action="click->reveal#hide" type="button" class="btn">
    Hide me!
  </button>

  <p data-target="reveal.item" class="mt-4">Hey 👋</p>
</div>
```

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-reveal-hidden-class` | `hidden` | CSS class to toggle | ✅ |


## Extending Controller

You can use inheritance to extend the functionality of any Stimulus components.

```js
import Reveal from "stimulus-reveal-controller"

export default class extends Reveal {
  connect() {
    super.connect()
    console.log("Do what you cant here.")
  }
}
```

These controllers will automatically have access to targets defined in the parent class.

If you override the connect, disconnect or any other methods from the parent, you'll want to call `super.method()` to make sure the parent functionality is executed.

## Development

### Project setup
```bash
$ yarn install
$ yarn dev
```

### Tests

[Jest](https://jestjs.io/) and [Puppeteer](https://github.com/puppeteer/puppeteer) are responsible to test this component:
```bash
$ yarn test
```

### Linter
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are responsible to lint and format this component:
```bash
$ yarn lint
$ yarn format
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
