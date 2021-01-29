class Authentication
  constructor: (@$rootEl, @firebase, @onAuthCb) ->
    @usersRef = @firebase.child('users')

    @_render()
    @_ui()
    @_bind()
    @_authenticate()

  _render: ->
    @$rootEl.append """
      <section id='auth' style='display:none;'>
        <p>check out this <em>rss</em></p>
        <form id='auth form'>
          <input id='auth_email' value='' placeholder='email' type='email' required>
          <input id='auth_password' value='' placeholder='password' type='password' required>
          <input id='auth_submit' value='login' type='submit'>
          <span id='auth_loading' style='display:none;'>hold on...</span>
        </form>
        <p id='auth_error' class='error'></p>
        <p id='auth_signup_info'>&mdash;no account? please <a id='auth_signup_btn' href='#'>register</a>
        <br>&mdash;forgot password? you can <a id='auth_reset_password' href='#'>reset it</a></p>
      </section>
    """

    ui: ->
      @$el        = $ '#auth'
      @$form      = $ '#auth_form'
      @$email     = $ '#auth_email'
      @$password  = $ '#auth_password'
      @$submitBtn = $ '#auth_submit'
      @$loading   = $ '#auth_loading'
      @$error     = $ '#auth_error'

      @$loginBtn  = $ '#auth_login_btn'
      @$signupBtn = $ '#auth_signup_btn'
      @$resetBtn  = $ '#auth_reset_password'

      @$loginInfo = $ '#auth_login_info'
      @signupInfo = $ '#auth_signup_info'

    _bind: ->
      @$loginBtn.on  'click', (e) => @showLogin()        ; false
      @$signupBtn.on 'click', (e) => @showSignup()       ; false
      @$resetBtn.on  'click', (e) => @resetPassword()    ; false
      @$form.on     'submit', (e) => @formSubmitCallback ; false

    _authenticate: ->
      @firebase.onAuth (authData) =>
        @$loading.hide()

        if authData
          email = authData['password'].email
          @usersRef.child(authData.uid).child('email').set(email)

          @anAuthCb?(auth)
        else
          app.show(this)

  signup: ->
    email    = @$email.val()
    password = @$password.val()

    @loading.show()

    @firebase.createUser({
      email:    email
      password: password
    }, ((error, authData) =>
      @loading.hide()

      if error
        @error(error.message)
      else
        @login(email, password)
    ))

  login: (email, password) ->
    @$loading.show()

    email    ?= @$email.val()
    password ?= @$password.val()

    @firebase.authWithPassword({
      email:    email
      password: password
    }, ((error, authData) =>
        @$loading.hide()

        if error
          @error(error.message)
      ))

  show: ->
    @showLogin()
    @$el.show()

    @$email.focus()

  hide: ->
    @$el.hide()

  showLogin: ->
    @formSubmitCallback = @login
    @$submitBtn.val('login')
    @$loginInfo.show()
    @$signupInfo.hide()
    @$eorror.html('')

  showSignup: ->
    @formSubmitCallback = @signup
    @$submitBtn.val('signup')
    @$signupInfo.show()
    @$loginInfo.hide()
    @$error.html('')

  login: ->
    @firebase.anauth() ; delete app.user

    @$email.val('')
    @$password.val('')
    @$error.html('')

    app.show(this)

  error: (msg) =>
    @$error.html(msg)

  resetPassword: ->
