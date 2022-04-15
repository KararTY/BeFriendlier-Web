export const sortEmoteEntryArray =
  (emoteEntryArray: any[]): any[] =>
    emoteEntryArray.sort((a, b) => new Intl.Collator('en', { numeric: true }).compare(a.emoteId, b.emoteId))

export const getStatColor = (statistic: string): string => {
  let str = ''
  switch (statistic) {
    case 'Health':
      str = 'is-success'
      break
    case 'Attack':
      str = 'is-danger'
      break
    case 'Defense':
      str = 'is-info'
      break
    case 'Toxic':
      str = 'is-yellow'
      break
    case 'Joker':
      str = 'is-purple'
      break
    case 'Joy':
      str = 'is-cyan'
      break
    case 'Lurker':
      str = 'is-orange'
      break
    default:
      return ''
  }
  return str.length > 0 ? ' ' + str : str
}

/**
* Yet another chaotic PRNG, the sfc stands for "Small Fast Counter". It is part of the PracRand PRNG test suite. It passes PractRand, as well as Crush/BigCrush (TestU01).
*
* From [github/michaeldzjap/rand-seed](https://github.com/michaeldzjap/rand-seed/blob/develop/src/Algorithms/Sfc32.ts).
*/
class Sfc32 {
  // Seed parameters.
  private _a: number
  private _b: number
  private _c: number
  private _d: number

  /**
   * Create a new sfc32 instance.
   */
  constructor (str: string) {
    // Create the seed for the random number algorithm
    const seed = this.xmur3(str)
    this._a = seed()
    this._b = seed()
    this._c = seed()
    this._d = seed()
  }

  /**
   * Based on MurmurHash3's mixing function.
   *
   * Each subsequent call to the return function of xmur3 produces a new "random" 32-bit hash value to be used as a seed in a PRNG.
   *
   * From [bryc/code/jshash](https://github.com/bryc/code/blob/master/jshash/PRNGs.md#addendum-a-seed-generating-functions).
   */
  xmur3 = (str: string): () => number => {
    // eslint-disable-next-line no-var
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
      h = h << 13 | h >>> 19
    }
    return function () {
      h = Math.imul(h ^ h >>> 16, 2246822507)
      h = Math.imul(h ^ h >>> 13, 3266489909)
      return (h ^= h >>> 16) >>> 0
    }
  }

  /**
   * Generate a random number using the sfc32 algorithm.
   */
  number = (): number => {
    this._a >>>= 0; this._b >>>= 0; this._c >>>= 0; this._d >>>= 0
    let t = (this._a + this._b) | 0
    this._a = this._b ^ this._b >>> 9
    this._b = this._c + (this._c << 3) | 0
    this._c = (this._c << 21 | this._c >>> 11)
    this._d = this._d + 1 | 0
    t = t + this._d | 0
    this._c = this._c + t | 0

    return (t >>> 0) / 4294967296
  }
}

const Battle = {
  nextLevelExperience (level: number) {
    return level * ((0.04 * level + 0.8) * level + 2)
  },

  mapRange (value: number, low1: number, high1: number, low2: number, high2: number) {
    return (low2 + (high2 - low2) * (value - low1) / (high1 - low1)).toFixed()
  },

  sortEmoteEntryArray: sortEmoteEntryArray,

  Sfc32: Sfc32,

  defaultStatistics: [
    {
      name: 'Order',
      type: 'Data',
      curValue: 0
    },
    {
      name: 'Level',
      type: 'Statistic',
      percentage: 1,
      defValue: 1,
      addValue: 0,
      curValue: 1
    },
    {
      name: 'Experience',
      type: 'Statistic',
      percentage: 1,
      defValue: 0,
      addValue: 0,
      curValue: 0
    },
    {
      name: 'Health',
      type: 'Statistic',
      percentage: 1,
      defValue: 10,
      addValue: 0,
      curValue: 10
    },
    {
      name: 'Attack',
      type: 'Statistic',
      percentage: 1,
      defValue: 1,
      addValue: 0,
      curValue: 1
    },
    {
      name: 'Defense',
      type: 'Statistic',
      percentage: 1,
      defValue: 1,
      addValue: 0,
      curValue: 1
    }
  ],

  namedDefaultStatisticsNames: ['Toxic', 'Joker', 'Joy', 'Lurker'],

  namedDefaultStatisticsDefaults: {
    type: 'Statistic',
    percentage: 0.01,
    defValue: 0.01,
    addValue: 0,
    curValue: 0.01
  }
}

export default Battle
