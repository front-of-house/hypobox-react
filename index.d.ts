import React from 'react'
import { Hypostyle, HypostyleObject, Theme } from 'hypostyle'

type HypoProps = React.PropsWithChildren<{ hypostyle: Hypostyle }>

type CustomStyle = ((theme: Theme) => Partial<HypostyleObject>) | Partial<HypostyleObject>

type BoxProps = React.PropsWithChildren<{
  as: keyof JSX.IntrinsicElements;
  className?: string;
  css?: CustomStyle;
  cx?: CustomStyle;
}>

export function Hypo(props: HypoProps): React.ReactElement
export function Box(props: BoxProps): React.ReactElement
