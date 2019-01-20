/**
 * A generator producing numbers from the fibonacci sequence
 *
 * Usage:
 *  gen = fibGenerator(6) // {}
 *  gen.next() // { value: 1, done: false }
 *  gen.next() // { value: 1, done: false }
 *  gen.next() // { value: 2, done: false }
 *  gen.next() // { value: 3, done: false }
 *  gen.next() // { value: 5, done: false }
 *  gen.next() // { value: null, done: true }
 *  gen.next() // { value: undefined, done: true }
 *
 *  // or
 *
 *  gen = fibGenerator(6)
 *  [...gen] // [ 1, 1, 2, 3, 5 ]
 *
 * @param  {Number} [max=Number.MAX_SAFE_INTEGER] the maximum number, once reached the
 *                                 sequence will stop progressing
 * @return {Generator}             a generator function
 */
const fibGenerator = function * f (max = Number.MAX_SAFE_INTEGER) {
  let n1 = 0
  let n2 = 0

  while (true) {
    const nextVal = n2 === 0 ? 1 : n1 + n2
    const prevVal = n2
    n2 = nextVal
    n1 = prevVal

    if (nextVal >= max) {
      return null
    }

    yield nextVal
  }
}

module.exports = fibGenerator
