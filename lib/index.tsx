import React from 'react'
import { Hypostyle, HypostyleObject, HypostyleObjectOrFunction } from 'hypostyle'
import { Properties as CSSProperties } from 'csstype'

type CSSPropertyNames = keyof CSSProperties

export type As = keyof JSX.IntrinsicElements
export type HypoProps = { hypostyle: Hypostyle }
export type BoxProps = {
  as?: As
  cx?: HypostyleObjectOrFunction
  style?: { [property in CSSPropertyNames]: string | number }
} & HypostyleObject

var context = React.createContext({} as Hypostyle)

export function useHypostyle(): Hypostyle {
  return React.useContext<Hypostyle>(context)
}

export function useTheme() {
  var hypo = useHypostyle()
  return hypo.theme
}

export function Hypo(
  props: React.PropsWithChildren<HypoProps>
): React.FunctionComponentElement<React.ProviderProps<Hypostyle>> {
  return React.createElement(context.Provider, {
    value: props.hypostyle,
    children: props.children,
  })
}

export var Box = React.forwardRef<HTMLElement, BoxProps>((p, ref) => {
  var hypostyle = useHypostyle()
  var picked = hypostyle.pick<BoxProps>(p)
  var element = picked.props.as || 'div'
  var cx = picked.props.cx || {}
  var className = picked.props.className

  var css = hypostyle.css({
    ...hypostyle.explode(picked.styles), // custom attr
    ...hypostyle.explode(cx || {}), // custom cx
  })

  delete picked.props.as
  delete picked.props.cx

  return React.createElement(element, {
    ref,
    ...picked.props,
    className: ([className, css] as string[])
      .filter(Boolean)
      .map((s) => s.trim())
      .join(' '),
  })
})

export function compose(Element: As | React.ComponentType<BoxProps>, styles: HypostyleObjectOrFunction) {
  return (props: BoxProps) => {
    var hypostyle = useHypostyle()
    var picked = hypostyle.pick<BoxProps>(props)
    var cx = {
      ...hypostyle.explode(styles), // base
      ...hypostyle.explode(picked.styles), // custom attr
      ...hypostyle.explode(picked.props.cx || {}), // custom cx
    }

    return typeof Element === 'function' ? (
      <Element {...picked.props} cx={cx} />
    ) : (
      <Box as={Element} {...picked.props} cx={cx} />
    )
  }
}
