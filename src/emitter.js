const EventEmitter = require('eventemitter3')

/**
 * Event emitter that emits fibonacci numbers at a given frequency (in milliseconds)
 * @extends EventEmitter
 *
 * @fires {Number} a 'data' event for every new number in the sequence
 * @fires {void} a 'end' event once the sequence finished
 *
 * Usage:
 *
 *  const fe = new FibEmitter(6, 10)
 *  fe.on('data', n => console.log(n))
 *  fe.on('end', () => console.log('done!'))
 *  fe.start()
 *  // 1
 *  // 1
 *  // 2
 *  // 3
 *  // 5
 *  // done!
 */
class FibEmitter extends EventEmitter {
  /**
   * Creaes a new FibEmitter
   * @param {Number} [max=Number.MAX_SAFE_INTEGER]    the maximum number, once reached the
   *                                   sequence will stop progressing
   * @param {Number} [emitEveryMs=100] The number of milliseconds between emitted
   *                                   numbers
   */
  constructor (max = Number.MAX_SAFE_INTEGER, emitEveryMs = 100) {
    super()
    this._max = max
    this._emitEveryMs = emitEveryMs
  }

  start () {
    let n1 = 0
    let n2 = 0
    let interval

    const next = () => {
      const nextVal = n2 === 0 ? 1 : n1 + n2
      const prevVal = n2
      n2 = nextVal
      n1 = prevVal

      if (nextVal >= this._max) {
        clearInterval(interval)
        this.emit('end')
        return null
      }

      this.emit('data', nextVal)
    }

    setInterval(next, this._emitEveryMs)
  }
}

module.exports = FibEmitter
