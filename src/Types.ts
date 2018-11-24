import Grid from './model/Grid'

export type Coordinate = [ number, number ]

export type Rules = (current: Grid) => Grid