mdlr('[html]realworld-main-articles', m => {

  m.html`
    {#each article in articles}
      <div class="article-preview">
      <div class="article-meta">
        <a href="#/profile"><img src="{article.author.image}" /></a>
        <div class="info">
        <a href="" class="author">{article.author.username}</a>
        <span class="date">January 20th</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i>{article.favoritesCount}
        </button>
      </div>
      <a href="#/article?slug={article.slug}" class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
        {#each tag in article.tagList}
          <li class="tag-default tag-pill tag-outline">{tag}</li>
        {/each}
        </ul>
      </a>
      </div>
    {:else}
      {#if articles === null}
      <div class="article-preview">loading articles...</div>
      {:else}
      <div class="article-preview">No articles are here... yet.</div>
      {/if}
    {/each}`;

  return class {
    api = null;
    user = null;
    options = null;

    articles = null;
    feed = 'global';

    async connected() {
      this.articles = await (this.feed === 'user' ? this.api.getUserFeed(this.user) : this.api.getGlobalFeed(this.user, this.options));

      m.redraw(this);
    }
  }
})