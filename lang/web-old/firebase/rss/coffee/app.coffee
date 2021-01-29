class App
  constructor: (@firebaseAppName) ->
    @firebase = new Firebase('https://dm7.firebaseio.com')
    @ui()
    @render()
  ui: ->
    @$el =$ '#app'

  render: ->
    @dashView = new Dashboard @$el, @firebase

  show: (view) ->
    @currentView?.hide()
    @currentView = view
    @currentView.show()

  start: ->
    @authView = new Authentication @$el, @firebase, (@user) =>
      @show(@dashView)
