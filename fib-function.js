/**
 * Generates a fibonacci function: a function that returns a new element of the
 * fibonacci series every time that it is invoked.
 *
 * Usage:
 *  const f = genFib(6)
 *  f() // 1
 *  f() // 1
 *  f() // 2
 *  f() // 3
 *  f() // 5
 *  f() // null
 *  f() // null
 *
 * @param  {Number} [max=Infinity] the maximum number, once reached the
 *                                 sequence will stop progressing
 * @return {function}
 */
const genFib = (max = Infinity) => {
  let n1 = 0
  let n2 = 0

  return () => {
    const nextVal = n2 === 0 ? 1 : n1 + n2
    const prevVal = n2
    n2 = nextVal
    n1 = prevVal

    if (nextVal >= max) {
      return null
    }

    return nextVal
  }
}

module.exports = genFib
