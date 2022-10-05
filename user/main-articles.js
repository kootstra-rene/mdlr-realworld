mdlr('[html]realworld-main-articles', m => {

  m.require('[html]realworld-article-meta');

  m.html`
  {#each article in articles}
    <div class="article-preview">

    <realworld-article-meta article={article} api={api} user={user} options={options} />
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

    async connected() {
      this.articles = await this.api.getArticles(this.user, this.options);

      m.redraw(this);
    }
  }

})