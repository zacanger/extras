class Dashboard
  constructor: (@$rootEl, @firebase) =>
    @subscriptionCollection = []
    @_render()
    @_ui()
    @_bind()

  _render: ->
    @$rootEl.append """
       <section id='dash' style='display:none;'>
        <p><span id='dash_email'></span> &mdash; <a id='dash_logout_btn' href='#'>logout</a></p>
        <div id='subscriptions'>
          <p>
            <form id='subscriptions_new_form'>
              <input id='subscriptions_new_name' placeholder='name' />
              <input id='subscriptions_new_url' placeholder='link to rss feed' type='url' />
              <input id='subscriptions_new_submit' value='Add' type='submit' />
            </form>
          </p>
          <ul id='subscriptions_list' class='subscriptions-list'></ul>
        </div>
      </section>
    """

  _ui: ->
    @$el         = $ '#dash'
    @$email      = $ '#dash_email'
    @$logoutBtn  = $ '#dash_logout_btn'
    @$newForm    = $ '#subscriptions_new_form'
    @$newUrl     = $ '#subscriptions_new_url'
    @$newName    = $ '#subscriptions_new_name'
    @$list       = $ '#subscriptions_list'

# the below is the cool bit. @subscriptionsRef is the ref to user subs collection
# child_added bound, triggered when app loads data from collection
# @subscriptionsRef pushes new subs items
# child_added triggered, new UI element built, @snapshot is passed

  show: ->
    @uid         = app.user.uid
    @userEmail   = app.user[app.user.provider].email
    @$email.html(@userEmail)
    @subscriptionsRef = @firebase.child('users').child(@uid).child('subscriptions')
    @subscriptionsRef.on 'child_added', (snapshot) =>
      @subscriptionCollection.push(new Subscription(@$list, snapshot))
    @$el.show()

  hide: ->
    $.each @subscriptionCollection, (i, el) -> el.destroy()
    @subscriptionsRef.off()
    delete @uid
    delete @userEmail
    delete @subscriptionsRef
    @$el.hide()

  _bind: ->
    @$logoutBtn.on 'click', (e) -> app.authView.logout() ; false
    @$newForm.on  'submit', (e) -> @addNewSubscription() ; false

  addNewSubscription: ->
    url  = @$newUrl.val()  ; @$newUrl.val('')
    name = @$newName.val() ; @$newName.val('')
    @subscriptionsRef.push({url: url, name: name})
    @$newName.focus()
