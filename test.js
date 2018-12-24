import test from 'ava'
import genFib from './fib-function'
import genFibIterator from './fib-iterator'
import fibGenerator from './fib-generator'
import genFibIterable from './fib-iterable'
import FibEmitter from './fib-emitter'

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
  fe.on('finish', () => {
    t.deepEqual(result, expected)
    t.end()
  })
  fe.start()
})
