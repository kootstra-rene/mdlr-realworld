mdlr('[html]realworld', m => {

  m.require('[html]realworld-header');
  m.require('[html]realworld-footer');
  m.require('[html]realworld-pages');
  m.require('[html]realworld-login');
  m.require('[html]realworld-settings');
  m.require('[html]realworld-article');
  m.require('[html]realworld-article-create');
  m.require('[html]realworld-profile');

  m.html`
    <m-realworld-header />
    {#if hash === '#/'}
      <m-realworld-pages />
    {:elseif hash === '#/login' || hash === '#/register'}
      <m-realworld-login />
    {:elseif hash === '#/settings'}
      <m-realworld-settings />
    {:elseif hash === '#/editor'}
      <m-realworld-article-create />
    {:elseif hash === '#/article'}
      <m-realworld-article />
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

    constructor() {
      const url = new URL(window.location.href);
      this.hash = url.hash;
    }

    connected() {
      // primitive router
      window.addEventListener('hashchange', e => {
        const url = new URL(e.newURL);
        this.hash = url.hash;

        m.redraw(this);
      });
    }
  }

});