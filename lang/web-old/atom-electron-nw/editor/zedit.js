var newButton, openButton, saveButton, editor, menu, fileEntry, hasWriteAccess
  , gui = require('nw.gui')
  , fs = require('fs')
  , clipboard = gui.Clipboard.get()

if (process.platform == 'darwin') { // for macs
  var menu = new gui.Menu({type : 'menubar'})
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title)
  gui.Window.get().menu = menu
}

function handleDocumentChange(title){
  var
    mode     = 'javascript'
  , modeName = 'JavaScript'
  if (title) {
    title = title.match(/[^/]+$/)[0]
    document.getElementById('title').innerHTML = title
    document.title = title
    if (title.match(/.json$/)) {
      mode = {name : 'javascript', json : true}
      modeName = 'JavaScript (JSON)'
    } else if (title.match(/.html$/)) {
      mode = 'htmlmixed'
      modeName = 'HTML'
    } else if (title.match(/.css$/)) {
      mode = 'css'
      modeName = 'CSS'
    }
  } else {
    document.getElementById('title').innerHTML = '[nothing loaded]'
  }
  editor.setOption('mode', mode)
  document.getElementById('mode').innerHTML = modeName
}

function newFile(){
  fileEntry      = null
  hasWriteAccess = false
  handleDocumentChange(null)
}

function setFile(theFileEntry, isWritable){
  fileEntry      = theFileEntry
  hasWriteAccess = isWritable
}

function readFileIntoEditor(theFileEntry){
  fs.readFile(theFileEntry, function(err, data){
    if (err) {
      console.log('reading error', err)
    }
    handleDocumentChange(theFileEntry)
    editor.setValue(String(data))
  })
}

function writeEditorToFile(theFileEntry){
  var str = editor.getValue()
  fs.writeFile(theFileEntry, editor.getValue(), function(err){
    if (err) {
      console.log('writing error', err)
      return
    }
    handleDocumentChange(theFileEntry)
    console.log('wrote.')
  })
}

var onChosenFileToOpen = function(theFileEntry){
  setFile(theFileEntry, false)
  readFileIntoEditor(theFileEntry)
}

var onChosenFileToSave = function(theFileEntry){
  setFile(theFileEntry, true)
  writeEditorToFile(theFileEntry)
}

function handleNewButton(){
  if (false) {
    newFile()
    editor.setValue('')
  } else {
    var
      x = window.screenX + 10
    , y = window.screenY + 10
    window.open('index.html', '_blank', 'screenX=' + x + ',screenY=' + y)
  }
}

function handleOpenButton(){$('#openFile').trigger('click')}

function handleSaveButton(){
  if (fileEntry && hasWriteAccess) {
    writeEditorToFile(fileEntry)
  } else {
    $('#saveFile').trigger('click')
  }
}

function initContextMenu(){
  menu = new gui.Menu()
  menu.append(new gui.MenuItem({
    label : 'Copy'
  , click : function() {
      clipboard.set(editor.getSelection())
    }
  }))
  menu.append(new gui.MenuItem({
    label : 'Cut'
  , click : function(){
      clipboard.set(editor.getSelection())
      editor.replaceSelection('')
    }
  }))
  menu.append(new gui.MenuItem({
    label : 'Paste'
  , click : function(){
      editor.replaceSelection(clipboard.get())
    }
  }))

  document.getElementById('editor').addEventListener('contextmenu', function(ev){
    ev.preventDefault()
    menu.popup(ev.x, ev.y)
    return false
  })
}

onload = function(){
  initContextMenu()
  newButton  = document.getElementById('new')
  openButton = document.getElementById('open')
  saveButton = document.getElementById('save')
  newButton.addEventListener( 'click', handleNewButton)
  openButton.addEventListener('click', handleOpenButton)
  saveButton.addEventListener('click', handleSaveButton)

  $('#saveFile').change(function(evt){onChosenFileToSave($(this).val())})
  $('#openFile').change(function(evt){onChosenFileToOpen($(this).val())})

  editor = CodeMirror(
    document.getElementById('editor'), {
      mode        : {name : 'javascript', json : true}
    , lineNumbers : true
    , keyMap      : 'vim'
    , theme       : 'zemir'
    , extraKeys   : {
        'Cmd-S'   : function(instance){handleSaveButton()}
      , 'Ctrl-S'  : function(instance){handleSaveButton()}
      , 'Cmd-O'   : function(instance){handleOpenButton()}
      , 'Ctrl-O'  : function(instance){handleOpenButton()}
      , 'Cmd-N'   : function(instance){handleNewButton()}
      , 'Ctrl-N'  : function(instance){handleNewButton()}
      }
  })
  newFile()
  onresize()
  gui.Window.get().show()
}

onresize = function(){
  var
    container       = document.getElementById('editor')
  , containerWidth  = container.offsetWidth
  , containerHeight = container.offsetHeight
  , scrollerElement = editor.getScrollerElement()
  scrollerElement.style.width  = containerWidth  + 'px'
  scrollerElement.style.height = containerHeight + 'px'
  editor.refresh()
}

