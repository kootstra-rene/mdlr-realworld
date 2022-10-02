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
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              Follow {article.author.username} <span class="counter">(10)</span>
            </button>
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              Favorite Post <span class="counter">(29)</span>
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
              <span class="date">January 20th</span>
            </div>

            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              Follow {article.author.username}
            </button>
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              Favorite Post <span class="counter">(29)</span>
            </button>
          </div>
        </div>

        <div class="row">
          <m-realworld-article-comments api={api} user={user} options={options} />
        </div>
        {/if}

      </div>

    </div>`;

  return class {
    api = null;
    user = null;
    options = null;

    article = null;

    async connected() {
      this.article = await this.api.getArticle(this.options.slug);
      console.log(this.article);
      m.redraw(this);
    }
  }

})