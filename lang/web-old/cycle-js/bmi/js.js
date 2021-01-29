const {div, input, h3, makeDOMDriver} = CycleDOM

function main({DOM}){
  const changeWeight$ = DOM.select('#weight')
    .events('input')
    .map(ev => ev.target.value)
  const changeHeight$ = DOM.select('#height')
    .events('input')
    .map(ev => ev.target.value)
  const state$ = Rx.Observable.combineLatest(
    changeWeight$.startWith(70)
  , changeHeight$.startWith(170)
  , (weight, height) => {
      const heightMeters = height * 0.01
      const bmi          = Math.round(weight / (heightMeters * heightMeters))
      return {weight, height, bmi}
    }
  )

  return {
    DOM : state$.map(({weight, height, bmi}) =>
      div([
        div([
          'weight ' + weight + 'kg'
          , input('#weight', {type : 'range', min : 30, max : 120, value : weight})
        ])
        , div([
          'height ' + height + 'cm'
          , input('#height', {type : 'range', min : 140, max : 200, value : height})
        ])
        , h3('your bmi is ' + bmi)
      ])
    )
  }
}

Cycle.run(main, {DOM : makeDOMDriver('#app')})

