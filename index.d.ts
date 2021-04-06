import React from 'react'
import { Hypostyle, HypostyleObject, HypostyleObjectOrFunction } from 'hypostyle'

export type As = keyof JSX.IntrinsicElements | React.ComponentType<typeof Box>
export type HypoProps = React.PropsWithChildren<{ hypostyle: Hypostyle }>
export type BoxProps<T extends As> = React.PropsWithChildren<{
  as?: T;
  className?: string;
  cx?: HypostyleObjectOrFunction;
} & HypostyleObject>
export type Box<T extends As> = (props: BoxProps<T>) => React.ReactElement<any, T>

export function Hypo(props: HypoProps): React.ReactElement
export function Box<T extends As>(props: BoxProps<T>): React.ReactElement<any, T>
export function compose<T extends As>(as: T, styles: HypostyleObjectOrFunction): Box<T>
