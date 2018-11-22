import Pattern from './model/Pattern'

const Blinker = new Pattern([ [ 20, 25 ], [ 20, 26 ], [ 20, 27 ] ])

const SpaceShip = new Pattern([
  [ 30, 35 ], [ 28, 36 ], [ 32, 36 ], [ 27, 37 ], [ 27, 38 ],
  [ 32, 38 ], [ 27, 39 ], [ 28, 39 ], [ 29, 39 ], [ 30, 39 ], [ 31, 39 ]
])

const Glider = new Pattern([
  [ 10, 10 ], [ 11, 11 ], [ 9, 12 ], [ 10, 12 ], [ 11, 12 ]
])

const TenHorizontal = new Pattern([
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
  [ 30, 25 ],
])

export default { Blinker, SpaceShip, Glider, TenHorizontal }