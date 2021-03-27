const React = require('react')

const context = React.createContext({})

export function Hypo ({ hypostyle, children }) {
  return <context.Provider value={hypostyle}>{children}</context.Provider>
}

const Box = React.forwardRef(
  ({ as = 'div', className = '', css, cx, ...props }, ref) => {
    const hypostyle = React.useContext(context)
    const cleaned = hypostyle.pick(props)

    return React.createElement(as, {
      ref,
      className: [
        className,
        hypostyle.css(cleaned.styles),
        css && hypostyle.css(css),
        cx && hypostyle.css(cx)
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
