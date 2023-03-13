mdlr('[html]realworld-app', m => {

  const { Router } = m.require('core:router');

  m.require('[html]realworld-header');
  m.require('[html]realworld-main');
  m.require('[html]realworld-login');
  m.require('[html]realworld-settings');
  m.require('[html]realworld-article');
  m.require('[html]realworld-article-create');
  m.require('[html]realworld-profile');
  m.require('[html]realworld-footer');

  const api = m.require('api:realworld');

  m.html`
  <realworld-header user={user} />
  {#if path === '/'}
    <realworld-main{=} />
  {:elseif path === '/login'}
    <realworld-login{=} mode="in" />
  {:elseif path === '/register'}
    <realworld-login{=} mode="up"/>
  {:elseif path === '/settings'}
    <realworld-settings{=} />
  {:elseif path === '/editor'}
    <realworld-article-create{=} />
  {:elseif path === '/article'}
    <realworld-article{=} />
  {:elseif path === '/profile'}
    <realworld-profile{=} />
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
  <link prefetch href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
  <link prefetch href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
  <link prefetch rel="stylesheet" href="//demo.productionready.io/main.css">`;

  return class {
    #router = new Router();
    api = api;
    path = '/';
    user = null;
    search = {};

    constructor() {
      const update = this.#update.bind(this);

      this.#router.get('/*', update)
      this.#router.get('/', update)
    }

    connected() {
      this.#router.connect(window.location.href)
      document.body.style.overflow = 'auto';
    }

    disconnected() {
      this.#router.disconnect();
    }

    #update({ path, search }) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}').user;
      this.search = search;
      this.path = path;
      m.redraw(this);
    }
  }

});