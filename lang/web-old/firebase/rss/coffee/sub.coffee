class Subscription
  consstructor: (@$rootEl, @snapshot) ->
    @_render()
    @_ui()
    @_bind()

  _render: ->
    @ref   = @snapshot.ref()
    @data  = @snapshot.val()
    @$el   = $ """
      <li class='subscriptions-list-item'>
        <a href='#' class='subscriptions-remove-button'>&times;</a> #{@data.name} &mdash; <a href='#{@data.url}' target='_blank'>#{@data.url}</a>
      </li>
    """
    @$rootEl.append @$el

  _ui: ->
    @$deleteBtn = @$el.find('.subscriptions-remove-button')

  _bind: ->
    @$deleteBtn.on 'click',       (e) => @remove() ; false
    @$deleteBtn.on 'mouseenter',  (e) -> $(e.currentTarget).parent.addClass 'striked-out'
    @$deleteBtn.on 'mouseleave',  (e) -> $(e.currentTarget).parent.removeClass 'striked-out'

  _unbind: ->
    @$deleteBtn.off()

# removes subscription from db
  remove: ->
    if confirm('remove subscription?')
      @ref.remove()
      @destroy()

# when user logs out and data should be removed from DOM
  destroy: ->
    @_unbind()
    @$el.remove()
