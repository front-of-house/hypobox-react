const React = require('react')

const context = React.createContext({})
const Hypo = context.Provider

function Box ({ as = 'div', className = '', css, ...props }) {
  const hypostyle = React.useContext(context)
  const cleaned = hypostyle.pick(props)

  return React.createElement(as, {
    className: [
      className,
      hypostyle.css(cleaned.styles),
      css && hypostyle.css(css)
    ]
      .filter(Boolean)
      .map(s => s.trim())
      .join(' '),
    ...cleaned.props
  })
}

module.exports = {
  Hypo,
  Box
}
