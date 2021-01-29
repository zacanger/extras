import test                   from 'ava'
import sinon                  from 'sinon'
import React                  from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {render}               from 'react-dom'
import {Simulate}             from 'react-addons-test-utils'
import Toggle                 from './Toggle'

test('toggle--off class applied by default', t => {
  const output = renderStatic()
  t.true(output.includes('toggle--off'))
})

test('toggle--on class applied when initialToggledOn specified to true', t => {
  const output = renderStatic({initialToggledOn : true})
  t.true(output.includes('toggle--on'))
})

test('invokes the onToggle prop when clicked', t => {
  const
    onToggle = sinon.spy()
  , div      = renderToDiv({onToggle})
  , button   = div.querySelector('button')

  Simulate.click(button)

  t.true(div.innerHTML.includes('toggle--on'))
  t.true(onToggle.calledOnce)
  t.true(onToggle.calledWith(true))
})

function renderStatic(props) {
  return renderToStaticMarkup(<Toggle {...props} />)
}

function renderToDiv(props) {
  const div = document.createElement('div')
  render(
    <Toggle {...props}>
      {props.children || 'hello world'}
    </Toggle>,
    div
  )
  return div
}

