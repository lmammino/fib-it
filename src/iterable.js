/**
 * Generates an iterable object for the fibonacci sequence
 *
 * Usage:
 *  it = genFibIterable(6) // { [Symbol(Symbol.iterator)]: [GeneratorFunction: [Symbol.iterator]] }
 *  [...it] // [ 1, 1, 2, 3, 5 ]
 *
 *  // or
 *
 *  for (n of f) { console.log(n) }
 *  // 1
 *  // 1
 *  // 2
 *  // 3
 *  // 5
 *
 * @param  {Number} [max=Number.MAX_SAFE_INTEGER] the maximum number, once reached the
 *                                 sequence will stop progressing
 * @return {object}                an iterator object
 */
const genFibIterable = (max = Number.MAX_SAFE_INTEGER) => {
  return {
    * [Symbol.iterator] () {
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
  }
}

module.exports = genFibIterable
