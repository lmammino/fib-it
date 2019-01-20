/**
 * Generates an iterator object for the fibonacci sequence
 *
 * Usage:
 *  it = genFibIterator(6) // { next: [Function: next] }
 *  it.next() // { value: 1, done: false }
 *  it.next() // { value: 1, done: false }
 *  it.next() // { value: 2, done: false }
 *  it.next() // { value: 3, done: false }
 *  it.next() // { value: 5, done: false }
 *  it.next() // { value: null, done: true }
 *
 *  // or
 *
 *  it = genFibIterator(6)
 *  let result = it.next()
 *  while (!result.done) {
 *    console.log(result.value)
 *    result = it.next()
 *  }
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
const genFibIterator = (max = Number.MAX_SAFE_INTEGER) => {
  let n1 = 0
  let n2 = 0
  return {
    next: () => {
      let nextVal = n2 === 0 ? 1 : n1 + n2
      const prevVal = n2
      n2 = nextVal
      n1 = prevVal

      let done = false
      if (nextVal >= max) {
        nextVal = null
        done = true
      }

      return { value: nextVal, done }
    },

    [Symbol.iterator] () {
      return this
    }
  }
}

module.exports = genFibIterator
