mdlr('[html]realworld-main', m => {

  m.require('[html]realworld-main-articles');
  m.require('[html]realworld-main-tags');

  m.html`
    <div class="home-page">

      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">

          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                {#if !!user}
                <li class="nav-item">
                  <a class="nav-link {userFeed}" href="#/?feed=user&username={user.username}">Your Feed</a>
                </li>
                {/if}
                <li class="nav-item">
                  <a class="nav-link {globalFeed}" href="#/?feed=global">Global Feed</a>
                </li>
                {#if !!options.tag}
                <li class="nav-item">
                  <a class="nav-link {tagFeed}" href="#/?feed=tag&tag={options.tag}"># {options.tag}</a>
                </li>
                {/if}
              </ul>
            </div>

            <m-realworld-main-articles api={api} user={user} options={options} feed={options.feed} />

          </div>

          <div class="col-md-3">
            <m-realworld-main-tags api={api} />
          </div>

        </div>
      </div>

    </div>`;

    return class {
      api = null;
      user = null;
      options = {};

      // todo: there should be an easier method to this
      get userFeed() {
        return this.options.feed === 'user' ? 'active' : 'disabled';
      }

      get globalFeed() {
        return this.options.feed === 'global' ? 'active' : 'disabled';
      }

      get tagFeed() {
        return this.options.feed === 'tag' ? 'active' : 'disabled';
      }
    }
})