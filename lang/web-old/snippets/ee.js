/*
 * const e = new EventEmitter()
 * const unsub = e.subscribe('something', (x) => { dosStuffWith(x) })
 * // when done, unsub()
 * someThing().then((a) => e.emit('something', a))
 */

export default class EventEmitter {
  constructor () {
    this.events = {}
  }

  subscribe (name, f) {
    (this.events[name] || (this.events[name] = [])).push(f)
    return () => { // unsubscribe
      this.events[name] = this.events[name].filter((g) => g !== f)
    }
  }

  emit (name, x) {
    (this.events[name] || []).forEach((f) => {
      f.call(null, x)
    })
  }
}

// golfed
class E{constructor(){this.l={}}subscribe(n,f){(this.l[n]||(this.l[n]=[])).push(f);return()=>{this.l[n]=this.l[n].filter((g)=>g!==f)}}emit(n,x){(this.l[n]||[]).forEach((f)=>{f.call(null,x)})}}
