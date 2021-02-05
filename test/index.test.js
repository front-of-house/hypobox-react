import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import defaultTheme from 'hypostyle/presets/default'

import { Hypo, Box } from '../'

module.exports = (test, assert) => {
  test('base', () => {
    const hypo = hypostyle({
      ...defaultTheme,
      tokens: {
        color: {
          primary: 'tomato'
        },
        ...defaultTheme.tokens
      }
    })

    renderToString(
      <Hypo value={hypo}>
        <Box c='primary' />
      </Hypo>
    )
    const stylesheet = hypo.flush()
    assert(stylesheet.includes('color:tomato'))
  })
}
