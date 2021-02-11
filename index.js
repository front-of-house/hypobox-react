const React = require('react')

const context = React.createContext({})
const Hypo = context.Provider

const Box = React.forwardRef(
  ({ as = 'div', className = '', css, ...props }, ref) => {
    const hypostyle = React.useContext(context)
    const cleaned = hypostyle.pick(props)

    return React.createElement(as, {
      ref,
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
)

module.exports = {
  Hypo,
  Box
}
