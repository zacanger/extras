MyPackageView = require './wordcount-view'
{CompositeDisposable} = require 'atom'

module.exports = Wordcount =
  wordcountView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @wordcountView = new WordcountView(state.wordcountViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @wordcountView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'wordcount:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @wordcountView.destroy()

  serialize: ->
    wordcountViewState: @wordcountView.serialize()

  toggle: ->
    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      editor = atom.workspace.getActiveTextEditor()
      words  = editor.getText().split(/\s+/).length
      @wordcountView.setCount(words)
      @modalPanel.show()
