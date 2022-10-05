mdlr('[html]realworld-article', m => {

  m.require('[html]realworld-article-comments');

  m.html`
  <div class="article-page">
    <div class="banner">
      <div class="container">
      {#if article}
        <h1>{article.title}</h1>
        <realworld-article-meta api={api} user={user} options={options} article={article} details={details} />
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
        <realworld-article-meta api={api} user={user} options={options} article={article} details={details} />
      </div>
      <div class="row">
        <realworld-article-comments api={api} user={user} options={options} />
      </div>
      {/if}
    </div>
  </div>`;

  m.css`
  button + button {
    margin-left: 0.2em;
  }`;

  return class {
    api = null;
    user = null;
    options = null;

    article = null;
    details = true;

    async connected() {
      this.article = await this.api.getArticle(this.user, this.options);

      m.redraw(this);
    }
  }

})