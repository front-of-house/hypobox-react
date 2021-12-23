import { test } from 'uvu'
import * as assert from 'uvu/assert'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { hypostyle } from 'hypostyle'
import * as presets from 'hypostyle/presets'

import { Hypo, Box, compose, useHypostyle, useTheme } from '../'

test('no styles', () => {
  const hypo = hypostyle({})

  const html = renderToString(
    <Hypo hypostyle={hypo}>
      <Box />
    </Hypo>
  )

  assert.ok(/class=""/.test(html))
})

test('base, pick', () => {
  const hypo = hypostyle(presets)
  const html = renderToString(
    <Hypo hypostyle={hypo}>
      <Box order={1} style={{ background: 'blue' }} />
    </Hypo>
  )
  const sheet = hypo.flush()

  assert.ok(/order:1/.test(sheet))
  assert.ok(/style.+background/.test(html))
})

test('with as', () => {
  const hypo = hypostyle(presets)
  const html = renderToString(
    <Hypo hypostyle={hypo}>
      <Box as="h1" />
    </Hypo>
  )

  assert.ok(/h1/.test(html))
})

test('className', () => {
  const hypo = hypostyle(presets)
  const html = renderToString(
    <Hypo hypostyle={hypo}>
      <Box className="foo" w={10} />
    </Hypo>
  )

  assert.ok(/foo\s/.test(html))
})

test('cx', () => {
  const hypo = hypostyle(presets)
  renderToString(
    <Hypo hypostyle={hypo}>
      <Box cx={{ bg: 'white' }} />
      <Box cx={(theme) => ({ fontSize: theme.tokens.fontSize[0] })} />
    </Hypo>
  )
  const sheet = hypo.flush()

  assert.ok(/background:white/.test(sheet))
  assert.ok(/font-size/.test(sheet))
})

test('configure', () => {
  const hypo = hypostyle({
    ...presets,
    tokens: {
      color: {
        b: 'blue',
      },
    },
  })
  renderToString(
    <Hypo hypostyle={hypo}>
      <Box className="foo" c="b" />
    </Hypo>
  )
  const sheet = hypo.flush()

  assert.ok(/color:blue/.test(sheet))
})

test('compose', () => {
  const hypo = hypostyle(presets)

  const H1 = compose('h1', {
    fs: '30px',
  })
  const H2 = compose('h2', {
    fs: '20px',
    c: 'tomato',
  })
  const H3 = compose('h3', {
    c: 'blue',
  })
  const H3b = compose(H3, {
    c: 'red',
  })
  const Fn = compose('div', (theme) => ({
    fs: theme.tokens.fontSize[1],
  }))

  const html = renderToString(
    <Hypo hypostyle={hypo}>
      <H1 />
      <H2 c="black" />
      <H3 />
      <H3b />
      <Fn />
    </Hypo>
  )
  const sheet = hypo.flush()

  assert.ok(/<h1/.test(html))
  assert.ok(/<h2/.test(html))
  assert.ok(/<h3/.test(html))
  assert.ok(/font-size:30px/.test(sheet))
  assert.ok(/font-size:20px/.test(sheet))
  assert.ok(!/color:tomato/.test(sheet))
  assert.ok(/color:blue/.test(sheet)) // blue is overridden
  assert.ok(/color:red/.test(sheet))
  assert.ok(/font-size/.test(sheet))
})

test('compose overrides', () => {
  const hypo = hypostyle(presets)

  const H1 = compose('h1', {
    bg: 'black',
    color: 'blue',
    fs: [2, 2, 1],
  })

  renderToString(
    <Hypo hypostyle={hypo}>
      <H1 c="tomato" fontSize="20px" cx={{ bg: 'white' }} />
    </Hypo>
  )
  const sheet = hypo.flush()

  assert.ok(/color:tomato/.test(sheet))
  assert.ok(/font-size:20px/.test(sheet))
  assert.ok(/background:white/.test(sheet))
})

test('compose overrides', () => {
  let plan = 0

  const hypo = hypostyle({
    ...presets,
    tokens: {
      ...presets,
      color: {
        primary: 'blue',
      },
    },
  })

  function UseHypostyle() {
    const hypo = useHypostyle()

    plan++
    assert.ok(hypo.css)

    return null
  }

  function UseTheme() {
    const theme = useTheme()
    plan++
    // @ts-ignore
    assert.equal(theme.tokens.color.primary, 'blue')
    return null
  }

  renderToString(
    <Hypo hypostyle={hypo}>
      <UseHypostyle />
      <UseTheme />
    </Hypo>
  )

  assert.equal(plan, 2)
})

test.run()
