![@hypobox/react](https://user-images.githubusercontent.com/4732330/96394851-af58f800-1188-11eb-8922-6a3a555d74fd.png)

<br/>

![npm](https://img.shields.io/npm/v/@hypobox/react) [![](https://badgen.net/bundlephobia/minzip/@hypobox/react)](https://bundlephobia.com/result?p=@hypobox/react)

Minimalist CSS-in-JS solution for React. Built with
[hypostyle](https://github.com/sure-thing/hypostyle).

```bash
npm i @hypobox/react
```

## Usage

To use `hypobox`, first have a look at
[hypostyle](https://github.com/sure-thing/hypostyle). Basically, you provide
`hypobox` a `hypostyle` instance, and then you style components using attributes
on React components that match your `hypostyle` setup.

### Setup

```jsx
import React from 'react'
import { render } from 'react-dom'
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'
import { Hypo } from '@hypobox/react'

const instance = hypostyle(presets)

render(
  <Hypo hypostyle={instance}>
    <App />
  </Hypo>
)
```

### Styling

In `hypobox`, all styling is done via the `Box` component.

```jsx
import { Box } from '@hypobox/react'

function App () {
  return <Box color='tomato'>Hello world!</Box>
}
```

If you've configured `shorthands` in your `hypostyle` instance (or are using
the presets), you can also use those:

```jsx
<Box c='tomato'>Hello world!</Box>
```

### Responsive Styles

Just like `hypostyle`, you can pass arrays or objects to denote responsive
values:

```jsx
<Box d={['none', 'none', 'flex']} />
```

Or:

```jsx
<Box d={{ 2: 'flex' }} />
```

### Macros & Variants

`macros` especially shine when used with JSX. Imagine the following config:

```jsx
const instance = hypostyle({
  macros: {
    caps: { textTransform: 'uppercase' }
  },
  variants: {
    link: {
      primary: {
        c: 'blue',
        '&:hover': {
          c: 'black'
        }
      }
    }
  }
})
```

You can reference those values like this:

```jsx
<Box as='a' caps link='primary'>
  Click me!
</Box>
```

### Custom Styles

For props you don't have configured as shorthands, or for custom values and
breakpoints, use the `css` prop. Examples:

```jsx
<Box css={{ c: 'tomato' }} />
<Box css={{
  '@media (max-width: 567px)': {
    d: 'none'
  }
}} />
```

For compatibility with other tools like `styled-components` that also provide a
`css` prop, `hypobox` also supports a `cx` prop.

```jsx
<Box
  cx={{
    '&:focus': {
      outline: '1px dashed tomato'
    }
  }}
/>
```

Both `css` and `cx` also support passing a function. The function will be
callled with the full `theme` you passed you `hypostyle` instance:

```jsx
<Box
  cx={theme => ({
    c: theme.tokens.colors.primary
  })}
/>
```

### Server Rendering

SSR is very simple. Complete example:

```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'
import { Hypo, Box } from '@hypobox/react'

const instance = hypostyle(presets)

const body = renderToString(
  <Hypo hypostyle={instance}>
    <Box f aic jcc>
      Flexy centered content
    </Box>
  </Hypo>
)

const stylesheet = hypo.flush()

const html = `
<!DOCTYPE html>
<html>
  <head>
    <style>${stylesheet}</style>
  </head>
  <body>${body}</body>
</html>
`
```

### Related

- [hyposcript](https://github.com/sure-thing/hyposcript)
- [hypostyle](https://github.com/sure-thing/hypostyle)
- [hypobox](https://github.com/sure-thing/hypobox)
- [styled-system](https://github.com/styled-system/styled-system)
- [nano-css](https://github.com/streamich/nano-css)

### License

MIT License © [Sure Thing](https://github.com/sure-thing)