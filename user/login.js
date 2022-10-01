mdlr('[html]realworld-login', m => {

  m.html`
    <div class="auth-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign {mode}</h1>

            {#if mode === 'up'}
            <p class="text-xs-center">
              <a href="#/login">Have an account?</a>
            </p>

            <ul class="error-messages">
              <li>That email is already taken</li>
            </ul>
            {/if}

            <form method="dialog">
              {#if mode === 'up'}
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              {/if}

              <fieldset class="form-group">
                <input{email} class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>

              <fieldset class="form-group">
                <input{password} class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>

              <button class="btn btn-lg btn-primary pull-xs-right" on={click}>
                Sign {mode}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>`;

  return class {
    mode = '';

    async click(e) {
      const email = this.email.value;
      const password = this.password.value;

      const result = await fetch(`https://api.realworld.io/api/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { email, password } })
      }).then(r => r.json());

      localStorage.setItem('user', JSON.stringify(result));

      const {hash, href} = window.location;
      window.location.href = href.replace(hash, '#/');

      //m.redirect('#/'); // todo: this would be awesome
    }
  };

})