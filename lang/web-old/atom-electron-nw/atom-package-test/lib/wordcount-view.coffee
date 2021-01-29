module.exports =
class WordcountView
  constructor: (serializedState) ->
    # Create root element
    @element = document.createElement('div')
    @element.classList.add('my-package')

    # Create message element
    message = document.createElement('div')
    message.textContent = "The MyPackage package is Alive! It's ALIVE!"
    message.classList.add('message')
    @element.appendChild(message)

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @element.remove()

  getElement: ->
    @element

    setCount: (count) ->
      displayText = "#{count} words been typed, yo"
      @element.children[0].textContent = displayText
