const { Readable } = require('readable-stream')
const { Buffer } = require('safe-buffer')

/**
 * A readable stream that implements the fibonacci sequence
 * @extends Readable
 *
 * Usage:
 *
 *   const s = new FibStream(7) // FibStream { ... }
 *   s.on('data', chunk => console.log(chunk.readUInt32LE(0).toString()))
 *   s.on('end', () => console.log('done!'))
 *   // 1
 *   // 1
 *   // 2
 *   // 3
 *   // 5
 *   // done!
 */
class FibStream extends Readable {
  /**
   * Creates a new FibStream instance
   * @param {Number} [max=Number.MAX_SAFE_INTEGER] the maximum number, once reached the
   *                                sequence will stop progressing
   * @param {[type]} options        stream options
   */
  constructor (max = Number.MAX_SAFE_INTEGER, options) {
    super(options)
    this._max = max
    this._n1 = 0
    this._n2 = 0
  }

  _read () {
    let nextVal = this._n2 === 0 ? 1 : this._n1 + this._n2
    const prevVal = this._n2
    this._n2 = nextVal
    this._n1 = prevVal

    if (nextVal >= this._max) {
      this.push(null) // terminates the stream
      return
    }

    const chunk = Buffer.alloc(4)
    chunk.writeUInt32LE(this._n2, 0)
    this.push(chunk)
  }
}

module.exports = FibStream
