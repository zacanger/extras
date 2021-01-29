/* Usage:
 * const e = ee()
 * // pre-filled emitter
 * ev = e({ foo: [(x) => console.log(x)] })
 * // listen
 * ev.on('foo', console.log)
 * // fire
 * ev.emit('foo', 'bar')
 * // unsubscribe
 * ev.on('something', cb)
 * ev.off('something', cb)
 */
type AnyFn = (any) => any
const ee = (evt = {}) => ({
  on(evtName: string, fn: AnyFn) {
    evt[evtName] = [...(evt[evtName] || []), fn]
  },

  off(evtName: string, fn: AnyFn) {
    evt[evtName] = evt[evtName].filter((f) => f != fn)
  },

  emit(evtName: string, data: any) {
    evt[evtName].map((f: AnyFn) => f(data))
  },
})
