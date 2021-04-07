const React = require('react')

const context = React.createContext({})

function Hypo ({ hypostyle, children }) {
  return React.createElement(context.Provider, {
    value: hypostyle,
    children
  })
}

const Box = React.forwardRef(
  ({ as = 'div', className = '', cx, ...props }, ref) => {
    const hypostyle = React.useContext(context)
    const cleaned = hypostyle.pick(props)

    return React.createElement(as, {
      ref,
      className: [
        className,
        hypostyle.css({
          ...cleaned.styles,
          ...hypostyle.explode(cx || {})
        })
      ]
        .filter(Boolean)
        .map(s => s.trim())
        .join(' '),
      ...cleaned.props
    })
  }
)

function compose (as, styles) {
  return React.forwardRef((props, ref) => {
    const hypostyle = React.useContext(context)
    const cleaned = hypostyle.pick(props)

    const p = {
      ref,
      ...cleaned.props,
      cx: {
        // explode everything to allow for overrides
        ...hypostyle.explode(styles),
        ...hypostyle.explode(cleaned.styles),
        ...hypostyle.explode(props.cx || {})
      }
    }

    return typeof as !== 'string'
      ? React.createElement(as, p)
      : React.createElement(Box, { as, ...p })
  })
}

module.exports = {
  Hypo,
  Box,
  compose
}
