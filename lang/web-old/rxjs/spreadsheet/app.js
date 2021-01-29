/* eslint-disable no-unused-vars */
const
  a = document.getElementById('a')
, b = document.getElementById('b')
, c = document.getElementById('c')
, { Rx } = window
, ops = a =>
  a
  .map(v => v.srcElement.value)
  .map(v => parseFloat(v))
, makeVals = a =>
  Rx.Observable.fromEvent(a, 'blur').let(ops)
, aVal = makeVals(a)
, bVal = makeVals(b)
, cVal = Rx.Observable.combineLatest(aVal, bVal, (a, b) => a + b)
cVal.subscribe(v => { c.value = v })
