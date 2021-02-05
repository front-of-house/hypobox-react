import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import defaultTheme from 'hypostyle/presets/default'

import { Hypo, Box } from '../'

module.exports = (test, assert) => {
  test('base', () => {
    const hypo = hypostyle(defaultTheme)

    const html = renderToString(
      <Hypo value={hypo}>
        <Box c='blue' />
      </Hypo>
    )
    const stylesheet = hypo.flush()
    assert(stylesheet.includes('color:blue'))
  })
}
