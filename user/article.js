mdlr('[html]realworld-article', m => {

  m.require('[html]realworld-article-comments');

  m.html`
    <div class="article-page">

      <div class="banner">
        <div class="container">

        {#if article}
          <h1>{article.title}</h1>

          <div class="article-meta">
            <a href="#/profile"><img src="{article.author.image}" /></a>
            <div class="info">
              <a href="" class="author">{article.author.username}</a>
              <span class="date">{updated}</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round" />Follow {article.author.username} <span class="counter">(10)</span>
            </button>
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart" />{favorited} Post <span class="counter">({article.favoritesCount})</span>
            </button>
          </div>
        {:else}
          <h1>...</h1>
        {/if}
        </div>
      </div>

      <div class="container page">

        {#if article}
        <div class="row article-content">
          <div class="col-md-12">
            <p>{article.body}</p>
            <ul class="tag-list">
            {#each tag in article.tagList}
              <li class="tag-default tag-pill tag-outline">{tag}</li>
            {/each}
            </ul>
          </div>
        </div>
        {:else}
        <div>loading article...</div>
        {/if}
  
        <hr />

        {#if article}
        <div class="article-actions">
          <div class="article-meta">
            <a href="#/profile"><img src="{article.author.image}" /></a>
            <div class="info">
              <a href="" class="author">{article.author.username}</a>
              <span class="date">{updated}</span>
            </div>

            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round" />Follow {article.author.username} <span class="counter">(10)</span>
            </button>
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart" />{favorited} <span class="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>

        <div class="row">
          <m-realworld-article-comments api={api} user={user} options={options} />
        </div>
        {/if}

      </div>

    </div>`;

  m.css`
    button + button {
      margin-left: 0.4em;
    }
  `;

  return class {
    api = null;
    user = null;
    options = null;

    article = null;

    async connected() {
      this.article = await this.api.getArticle(this.options.slug, this.user);

      m.redraw(this);
    }

    // todo: should these be part of the article dao?

    get favorited() {
      return !this.article?.favorited ? 'Favorite' : 'Unfavorite';
    }

    get updated() {
      const options = { month: 'long', day: 'numeric', year: 'numeric'};

      return new Intl.DateTimeFormat('en-US', options).format(new Date(this.article?.updatedAt || '1970-1-1'));
    }
  }

})