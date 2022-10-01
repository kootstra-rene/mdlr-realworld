// https://realworld-docs.netlify.app/docs/specs/frontend-specs/templates/

mdlr('[html]realworld-header', m => {

  m.html`
    <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="#/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a class="nav-link active" href="#/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/editor">
            <i class="ion-compose"></i>New Article
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/settings">
            <i class="ion-gear-a"></i>Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/login">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/register">Sign up</a>
        </li>
      </ul>
    </div>
    </nav>`;
})