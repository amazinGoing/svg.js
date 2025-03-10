/* globals describe expect it */

import { pathParser } from '../../../src/utils/pathParser.js'

describe('pathParser.js', () => {
  describe('pathParser()', () => {
    it('parses all paths correctly', () => {
      expect(pathParser('M2,0a2 2 0 00-2 2a2 2 0 002 2a.5.5 0 011 0z')).toEqual(
        [
          ['M', 2, 0],
          ['A', 2, 2, 0, 0, 0, 0, 2],
          ['A', 2, 2, 0, 0, 0, 2, 4],
          ['A', 0.5, 0.5, 0, 0, 1, 3, 4],
          ['Z']
        ]
      )

      expect(pathParser('M2,0a2 2 0 00-2 2a2 2 0 002 2a.5.5 0 111 0z')).toEqual(
        [
          ['M', 2, 0],
          ['A', 2, 2, 0, 0, 0, 0, 2],
          ['A', 2, 2, 0, 0, 0, 2, 4],
          ['A', 0.5, 0.5, 0, 1, 1, 3, 4],
          ['Z']
        ]
      )

      expect(pathParser('m10 10 h 80 v 80 h -80 l 300 400 z')).toEqual([
        ['M', 10, 10],
        ['H', 90],
        ['V', 90],
        ['H', 10],
        ['L', 310, 490],
        ['Z']
      ])

      expect(
        pathParser(
          'm10 80 c 40 10 65 10 95 80 s 150 150 180 80 t 300 300 q 52 10 95 80 z'
        )
      ).toEqual([
        ['M', 10, 80],
        ['C', 50, 90, 75, 90, 105, 160],
        ['S', 255, 310, 285, 240],
        ['T', 585, 540],
        ['Q', 637, 550, 680, 620],
        ['Z']
      ])

      expect(pathParser('m80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 z')).toEqual(
        [['M', 80, 80], ['A', 45, 45, 0, 0, 0, 125, 125], ['L', 125, 80], ['Z']]
      )

      expect(
        pathParser(
          'M215.458,245.23c0,0,77.403,0,94.274,0S405,216.451,405,138.054S329.581,15,287.9,15c-41.68,0-139.924,0-170.688,0C86.45,15,15,60.65,15,134.084c0,73.434,96.259,112.137,114.122,112.137C146.984,246.221,215.458,245.23,215.458,245.23z'
        )
      ).toEqual([
        ['M', 215.458, 245.23],
        ['C', 215.458, 245.23, 292.861, 245.23, 309.73199999999997, 245.23],
        ['S', 405, 216.451, 405, 138.054],
        ['S', 329.581, 15, 287.9, 15],
        [
          'C',
          246.21999999999997,
          15,
          147.97599999999997,
          15,
          117.21199999999999,
          15
        ],
        ['C', 86.45, 15, 15, 60.65, 15, 134.084],
        ['C', 15, 207.518, 111.259, 246.221, 129.122, 246.221],
        ['C', 146.984, 246.221, 215.458, 245.23, 215.458, 245.23],
        ['Z']
      ])

      expect(
        pathParser('M10 10-45-30.5.5 .89L2e-2.5.5-.5C.5.5.5.5.5.5L-3-4z')
      ).toEqual([
        ['M', 10, 10],
        ['L', -45, -30.5],
        ['L', 0.5, 0.89],
        ['L', 0.02, 0.5],
        ['L', 0.5, -0.5],
        ['C', 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        ['L', -3, -4],
        ['Z']
      ])

      expect(
        pathParser(
          'm 0,0 0,3189 2209,0 0,-3189 -2209,0 z m 154,154 1901,0 0,2881 -1901,0 0,-2881 z'
        )
      ).toEqual([
        ['M', 0, 0],
        ['L', 0, 3189],
        ['L', 2209, 3189],
        ['L', 2209, 0],
        ['L', 0, 0],
        ['Z'],
        ['M', 154, 154],
        ['L', 2055, 154],
        ['L', 2055, 3035],
        ['L', 154, 3035],
        ['L', 154, 154],
        ['Z']
      ])

      expect(pathParser('m 0,0 a 45 45, 0, 0, 0, 125 125')).toEqual([
        ['M', 0, 0],
        ['A', 45, 45, 0, 0, 0, 125, 125]
      ])

      expect(pathParser('M10 10 80 80 30 30 Z')).toEqual([
        ['M', 10, 10],
        ['L', 80, 80],
        ['L', 30, 30],
        ['Z']
      ])

      expect(pathParser('M10 10L.5.5.3.3Z')).toEqual([
        ['M', 10, 10],
        ['L', 0.5, 0.5],
        ['L', 0.3, 0.3],
        ['Z']
      ])

      // "a" commands without optional whitespace around the flag params and ending coordinate pair
      expect(pathParser('a32 32 0 00.03-45.22', false)).toEqual([
        ['a', 32.0, 32.0, 0.0, 0.0, 0.0, 0.03, -45.22]
      ])

      expect(pathParser('a48 48 0 1148-48', false)).toEqual([
        ['a', 48.0, 48.0, 0.0, 1.0, 1.0, 48.0, -48.0]
      ])

      expect(pathParser('a82.6 82.6 0 0033.48-20.25', false)).toEqual([
        ['a', 82.6, 82.6, 0.0, 0.0, 0.0, 33.48, -20.25]
      ])

      expect(pathParser('a82.45 82.45 0 00-20.24 33.47', false)).toEqual([
        ['a', 82.45, 82.45, 0.0, 0.0, 0.0, -20.24, 33.47]
      ])

      expect(pathParser('a2.51 2.51 0 01.25.32', false)).toEqual([
        ['a', 2.51, 2.51, 0, 0, 1, 0.25, 0.32]
      ])

      expect(pathParser('a2.51 2.51 0 00.25.32', false)).toEqual([
        ['a', 2.51, 2.51, 0, 0, 0, 0.25, 0.32]
      ])

      expect(pathParser('a2.51 2.51 0 000.25.32', false)).toEqual([
        ['a', 2.51, 2.51, 0, 0, 0, 0.25, 0.32]
      ])

      expect(pathParser('a48 48 0 1148-48 48 48 0 01-48 48', false)).toEqual([
        ['a', 48.0, 48.0, 0.0, 1.0, 1.0, 48.0, -48.0],
        ['a', 48.0, 48.0, 0.0, 0.0, 1.0, -48.0, 48.0]
      ])
    })
  })
})
