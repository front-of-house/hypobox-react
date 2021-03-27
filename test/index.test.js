import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import presets from 'hypostyle/presets'

import { Hypo, Box } from '../'

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
        <Box o={1} style={{ background: 'blue' }} />
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
        <Box css={{ c: 'white' }} cx={{ bg: 'white' }} />
      </Hypo>
    )
    const sheet = hypo.flush()

    assert(/color:white/.test(sheet))
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
}
