import test from 'ava'
import genFib from './function'
import genFibIterator from './iterator'
import fibGenerator from './generator'
import genFibIterable from './iterable'
import FibEmitter from './emitter'
import FibStream from './stream'

const expected = [1, 1, 2, 3, 5]

test('fib-function', t => {
  const f = genFib(6)
  const result = [f(), f(), f(), f(), f()]
  t.deepEqual(result, expected)
  t.is(null, f())

  const f2 = genFib(-1)
  t.is(null, f2())
})

test('fib-iterator', t => {
  const it = genFibIterator(6)
  const result = []
  let curr = it.next()
  while (!curr.done) {
    result.push(curr.value)
    curr = it.next()
  }
  t.deepEqual(result, expected)

  const it2 = genFibIterator(-1)
  curr = it2.next()
  t.is(null, curr.value)
  t.true(curr.done)

  const it3 = genFibIterator(6)
  const result3 = [...it3]
  t.deepEqual(result3, expected)
})

test('fib-generator', t => {
  const gen = fibGenerator(6)
  const result = [...gen]
  t.deepEqual(result, expected)

  const gen2 = fibGenerator(-1)
  const result2 = [...gen2]
  t.deepEqual(result2, [])
})

test('fib-iterable', t => {
  const it = genFibIterable(6)

  // make sure it is iterable
  t.true(Symbol.iterator in Object(it))

  const result = [...it]
  t.deepEqual(result, expected)

  const it2 = genFibIterable(-1)
  const result2 = [...it2]
  t.deepEqual(result2, [])
})

test.cb('fib-emitter', t => {
  t.plan(1)

  const fe = new FibEmitter(6, 10)
  const result = []
  fe.on('data', n => result.push(n))
  fe.on('end', () => {
    t.deepEqual(result, expected)
    t.end()
  })
  fe.start()
})

test.cb('fib-stream', t => {
  t.plan(1)

  const s = new FibStream(6)
  const result = []
  s.on('data', chunk => {
    result.push(chunk.readUInt32LE(0))
  })
  s.on('end', () => {
    t.deepEqual(result, expected)
    t.end()
  })
})
