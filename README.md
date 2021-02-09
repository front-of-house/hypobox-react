![@hypobox/react](https://user-images.githubusercontent.com/4732330/96394851-af58f800-1188-11eb-8922-6a3a555d74fd.png)

<br/>

![npm](https://img.shields.io/npm/v/@hypobox/react) [![](https://badgen.net/bundlephobia/minzip/@hypobox/react)](https://bundlephobia.com/result?p=@hypobox/react)

Hyper minimal React `Box` component, built with
[hypostyle](https://github.com/sure-thing/hypostyle).

```bash
npm i @hypobox/react
```

## Usage

> See the [hypobox docs](https://github.com/sure-thing/hypobox) for full
> details. Basically, it's the same except for React's context API and that this
> library is designed to work in the browser _and_ server.

```jsx
import React from 'react'
import { render } from 'react-dom'
import { hypostyle } from 'hypostyle'
import preses from 'hypostyle/presets'
import { Hypo, Box } from '@hypobox/react'

const hypo = hypostyle(presets)

render(
  <Hypo value={hypo}>
    <Box f aic fw>
      <Box w={[1, 1 / 2]}>
        <H1 c='#333'>Hello world!</H1>
      </Box>
      <Box w={[1, 1 / 2]}>
        <Box
          as='button'
          c='#333'
          css={tokens => ({
            '&:hover': { color: 'tomato' }
          })}
        >
          Click Me
        </Box>
      </Box>
    </Box>
  </Hypo>,
  document.getElementById('root')
)
```

### Server Rendering

Essentially the same as the above example except `renderToString` and style
extraction.

```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'
import { Hypo, Box } from '@hypobox/react'

const hypo = hypostyle(presets)

const body = renderToString(
  <Box f aic jcc>
    Flexy centered content
  </Box>
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
