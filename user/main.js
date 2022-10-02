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
                  <a class="nav-link disabled" href="#/?feed=user">Your Feed</a>
                </li>
                {/if}
                <li class="nav-item">
                  <a class="nav-link active" href="#/?feed=global">Global Feed</a>
                </li>
              </ul>
            </div>

            <m-realworld-main-articles api={api} user={user} feed={options.feed} />

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
    }
})