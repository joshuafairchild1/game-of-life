import Pattern from './model/Pattern'

const Blinker = new Pattern('Blinker', [ [ 20, 25 ], [ 20, 26 ], [ 20, 27 ] ])
const Spaceship = new Pattern('Spaceship', [
  [ 30, 35 ], [ 28, 36 ], [ 32, 36 ], [ 27, 37 ], [ 27, 38 ],
  [ 32, 38 ], [ 27, 39 ], [ 28, 39 ], [ 29, 39 ], [ 30, 39 ], [ 31, 39 ]
])
const Glider = new Pattern('Glider', [
  [ 10, 10 ], [ 11, 11 ], [ 9, 12 ], [ 10, 12 ], [ 11, 12 ]
])
const TenHorizontal = new Pattern('Horizontal Bar', [
  [ 20, 25 ],
  [ 21, 25 ],
  [ 22, 25 ],
  [ 23, 25 ],
  [ 24, 25 ],
  [ 25, 25 ],
  [ 26, 25 ],
  [ 27, 25 ],
  [ 28, 25 ],
  [ 29, 25 ],
  [ 30, 25 ]
])
const GosperGliderGun = new Pattern('Gosper\'s Glider Gun', [
  [ 3, 9 ], [ 4, 9 ], [ 3, 10 ], [ 4, 10 ], [ 15, 7 ], [ 16, 7 ], [ 14, 8 ],
  [ 18, 8 ], [ 13, 9 ], [ 19, 9 ], [ 13, 10 ], [ 17, 10 ], [ 19, 10 ],
  [ 20, 10 ], [ 13, 11 ], [ 19, 11 ], [ 14, 12 ], [ 18, 12 ], [ 15, 13 ],
  [ 16, 13 ], [ 27, 5 ], [ 25, 6 ], [ 27, 6 ], [ 23, 7 ], [ 24, 7 ], [ 23, 8 ],
  [ 24, 8 ], [ 23, 9 ], [ 24, 9 ], [ 25, 10 ], [ 27, 10 ], [ 27, 11 ],
  [ 37, 7 ], [ 38, 7 ], [ 37, 8 ], [ 38, 8 ]
])
const Empty = new Pattern('Empty', [])

const patterns: { [ key: string ]: Pattern } = {
  Blinker, Spaceship, Glider, TenHorizontal, GosperGliderGun, Empty
}

export const patternList: Pattern[] = []

Object.getOwnPropertyNames(patterns)
  .forEach(name => patternList.push(patterns[ name ]))

export default patterns