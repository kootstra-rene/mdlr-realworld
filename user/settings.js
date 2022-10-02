mdlr('[html]realworld-settings', m => {

  m.html`
    <div class="settings-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form method="dialog">
              <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" value={user.image}>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" value={user.username}>
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you">{user.bio || ''}</textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" value={user.email}>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            {#if !!user}
            <hr>
            <button class="btn btn-outline-danger" on={click:logout}>
              Or click here to logout.
            </button>
            {/if}
          </div>

        </div>
      </div>
    </div>`;

  return class {
    user = null;

    logout() {
      localStorage.setItem('user', '{}');

      const {hash, href} = window.location;
      window.location.href = href.replace(hash, '#/');

      //m.redirect('#/'); // todo: this would be awesome
    }
  }
})