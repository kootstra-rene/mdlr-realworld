mdlr('[html]realworld', m => {

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
    <m-realworld-header user={user} />
    {#if hash === '#/'}
      <m-realworld-main api={api} user={user} options={options} />
    {:elseif hash === '#/login'}
      <m-realworld-login api={api} mode="{'in'}" />
    {:elseif hash === '#/register'}
      <m-realworld-login mode="{'up'}"/>
    {:elseif hash === '#/settings'}
      <m-realworld-settings user={user} />
    {:elseif hash === '#/editor'}
      <m-realworld-article-create />
    {:elseif hash === '#/article'}
      <m-realworld-article api={api} user={user} options={options} />
    {:elseif hash === '#/profile'}
      <m-realworld-profile />
    {/if}
    <m-realworld-footer />`;

  document.head.innerHTML += `
    <meta charset="utf-8">
    <title>Conduit</title>
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css">
  `;

  return class {
    hash = '#/';
    user = null;
    options = {};

    constructor() {
      this.user = JSON.parse(localStorage.getItem('user') || '{}').user;

      this.route(window.location.href);
      this.api = api;
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
      console.log(search)

      const options = new URLSearchParams(search);
      this.options = [...options].reduce((a, [key, value]) => {
        a[key] = value;
        return a;
      }, {});

      console.log(this.options);
      this.hash = hash;
    }
  }

});