mdlr('[html]realworld-app', m => {

  m.require('[html]realworld-header');
  m.require('[html]realworld-footer');
  m.require('[html]realworld-main');
  m.require('[html]realworld-login');
  m.require('[html]realworld-settings');
  m.require('[html]realworld-article');
  m.require('[html]realworld-article-create');
  m.require('[html]realworld-profile');

  const api = m.require('api:realworld');

  m.html`
  <realworld-header user={user} />
  {#if hash === '#/'}
    <realworld-main api={api} user={user} options={options} />
  {:elseif hash === '#/login'}
    <realworld-login api={api} mode="{'in'}" />
  {:elseif hash === '#/register'}
    <realworld-login api={api} mode="{'up'}"/>
  {:elseif hash === '#/settings'}
    <realworld-settings api={api} user={user} />
  {:elseif hash === '#/editor'}
    <realworld-article-create />
  {:elseif hash === '#/article'}
    <realworld-article api={api} user={user} options={options} />
  {:elseif hash === '#/profile'}
    <realworld-profile api={api} user={user} options={options} />
  {/if}
  <realworld-footer />`;

  m.css`
  i {
    margin-right: 0.2em
  }`

  document.head.innerHTML += `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Conduit</title>
  <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
  <link prefetch href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
  <link prefetch href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
  <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
  <link prefetch rel="stylesheet" href="//demo.productionready.io/main.css">`;

  return class {
    api = api;
    hash = '#/';
    user = null;
    options = {};

    constructor() {
      this.user = JSON.parse(localStorage.getItem('user') || '{}').user;

      this.route(window.location.href);
    }

    connected() {
      // primitive router
      window.addEventListener('hashchange', e => {
        // todo: put user info in seperate module
        this.user = JSON.parse(localStorage.getItem('user') || '{}').user;

        this.route(e.newURL);
        m.redraw(this);
      });
    }

    route(newURL) {
      const url = new URL(newURL);
      const [hash, search] = url.hash.split('?');

      const options = new URLSearchParams(search);
      this.options = [...options].reduce((a, [key, value]) => {
        a[key] = value;
        return a;
      }, {});

      this.hash = hash || '#/';
    }
  }

});