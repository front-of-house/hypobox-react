import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'

import { Hypo, Box, compose } from '../'

module.exports = (test, assert) => {
  test('no styles', () => {
    const hypo = hypostyle()

    const html = renderToString(
      <Hypo hypostyle={hypo}>
        <Box />
      </Hypo>
    )

    assert(/class=""/.test(html))
  })

  test('base, pick', () => {
    const hypo = hypostyle(presets)
    const html = renderToString(
      <Hypo hypostyle={hypo}>
        <Box order={1} style={{ background: 'blue' }} />
      </Hypo>
    )
    const sheet = hypo.flush()

    assert(/order:1/.test(sheet))
    assert(/style.+background/.test(html))
  })

  test('with as', () => {
    const hypo = hypostyle(presets)
    const html = renderToString(
      <Hypo hypostyle={hypo}>
        <Box as='img' src='' />
      </Hypo>
    )

    assert(/img.+src/.test(html))
  })

  test('className', () => {
    const hypo = hypostyle(presets)
    const html = renderToString(
      <Hypo hypostyle={hypo}>
        <Box className='foo' w={10} />
      </Hypo>
    )

    assert(/foo\s/.test(html))
  })

  test('css/cx', () => {
    const hypo = hypostyle(presets)
    renderToString(
      <Hypo hypostyle={hypo}>
        <Box cx={{ bg: 'white' }} />
      </Hypo>
    )
    const sheet = hypo.flush()

    assert(/background:white/.test(sheet))
  })

  test('configure', () => {
    const hypo = hypostyle({
      ...presets,
      tokens: {
        color: {
          b: 'blue'
        }
      }
    })
    renderToString(
      <Hypo hypostyle={hypo}>
        <Box className='foo' c='b' />
      </Hypo>
    )
    const sheet = hypo.flush()

    assert(/color:blue/.test(sheet))
  })

  test('compose', () => {
    const hypo = hypostyle(presets)

    const H1 = compose('h1', {
      fs: '30px'
    })
    const H2 = compose('h2', {
      fs: '20px',
      c: 'tomato'
    })
    const A = compose('a', {
      c: 'blue'
    })
    const A2 = compose(A, {
      c: 'red'
    })
    const Fn = compose('div', theme => ({
      fs: theme.tokens.fontSize[1]
    }))

    const html = renderToString(
      <Hypo hypostyle={hypo}>
        <H1 />
        <H2 c='black' />
        <A2 />
        <Fn />
      </Hypo>
    )
    const sheet = hypo.flush()

    assert(/<h1/.test(html))
    assert(/<h2/.test(html))
    assert(/<a/.test(html))
    assert(/font-size:30px/.test(sheet))
    assert(/font-size:20px/.test(sheet))
    assert(!/color:tomato/.test(sheet))
    assert(/color:red/.test(sheet))
    assert(!/color:blue/.test(sheet)) // blue is overridden
    assert(/font-size/.test(sheet))
  })
}
