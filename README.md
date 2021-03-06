# react-colorizer

[![Greenkeeper badge](https://badges.greenkeeper.io/andcards/react-colorizer.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/andcards/react-colorizer.svg?branch=master)](https://travis-ci.org/andcards/react-colorizer)
[![npm package](https://badge.fury.io/js/react-colorizer.svg)](https://www.npmjs.org/package/react-colorizer)
[![Dependency Status](https://david-dm.org/andcards/react-colorizer.svg)](https://david-dm.org/andcards/react-colorizer)
[![devDependency Status](https://david-dm.org/andcards/react-colorizer/dev-status.svg)](https://david-dm.org/andcards/react-colorizer#info=devDependencies)
[![peerDependency Status](https://david-dm.org/andcards/react-colorizer/peer-status.svg)](https://david-dm.org/andcards/react-colorizer#info=peerDependencies)

A color picker component for React and React Native.

![](https://github.com/andcards/react-colorizer/blob/master/demo.gif)

Check out our app built on top of this component:

- Download from [Google Play Store](https://play.google.com/store/apps/details?id=com.cards.colorizer)

### Installation

```
yarn add react-colorizer
```

### The Gist

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'react-colorizer';
import fullScheme, { HarmonyTypes } from 'color-harmony-generator';

const selectedScheme = HarmonyTypes.TRIAD;

function onColorChanged(color) {
  const fullScheme = color.fullScheme(selectedScheme);
}

ReactDOM.render(
  <ColorPicker
    height={50}
    color="#e56500"
    width={255}
    onColorChanged={onColorChanged}
  />,
  document.getElementById('Container')
);
```

### API

prop                  | type                 | default value
----------------------|----------------------|--------------
`color`               | `string`             | '#ff0000'
`height`              | `number`             |
`width`               | `number`             |
`onColorChanged`      | `func`               |
`onColorChangeEnd`    | `func`               |
`onColorChangeStart`  | `func`               |

### Want to contribute?

Please see [CONTRIBUTING.md](CONTRIBUTING.md)

### License

MIT
