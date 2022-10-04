mdlr('[html]realworld-profile', m => {

  m.html`
    <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          {#if profile}
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="{ profile.image }" class="user-img" />
            <h4>{ profile.username }</h4>
            <p>{ profile.bio || ''}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>Follow { profile.username }
            </button>
          </div>
          {/if}

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <m-realworld-main-articles api={api} user={user} options={options} />

        </div>

      </div>
    </div>

  </div>`;

  return class {
    api = null;
    user = null;
    options = null;
    profile = null;

    async connected() {
      this.profile = await this.api.getProfile(this.user, this.options);
      console.log('#profile:', this.options)

      m.redraw(this);
    }
  }

})