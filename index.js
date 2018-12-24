const genFib = require('./function')
const genFibIterator = require('./iterator')
const fibGenerator = require('./generator')
const genFibIterable = require('./iterable')
const FibEmitter = require('./emitter')
const FibStream = require('./stream')

module.exports = {
  genFib,
  genFibIterator,
  fibGenerator,
  genFibIterable,
  FibEmitter,
  FibStream
}
