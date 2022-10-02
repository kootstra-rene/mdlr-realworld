mdlr('[html]realworld-pages', m => {

  m.html`
    <div class="home-page">

      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">

          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                {#if !!user}
                <li class="nav-item">
                  <a class="nav-link disabled" href="">Your Feed</a>
                </li>
                {/if}
                <li class="nav-item">
                  <a class="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            {#each article in globalArticles}
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
              <a href="#/article" class="preview-link">
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
            <div class="article-preview">loading articles...</div>
            {/each}

          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
              {#each tag in tags}
                <a href="" class="tag-pill tag-default">{tag}</a>
              {:else}
                <span>loading tags...</span>
              {/each}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>`;

    return class {
      api = null;
      user = null;
      globalArticles = [];
      tags = [];

      async connected() {
        // todo: article section to seperate component to reduce render time (only redraw articles i.s.o this compleet component)
        this.globalArticles = await this.api.getGlobalFeed();
        // todo: tags section to seperate component to reduce render time (only redraw tags i.s.o this compleet component)
        this.tags = await this.api.getTags();

        // remark: putting the sections in each component will also solve the blocked chain without promise.all (foreach can solve this to but less clean code)

        m.redraw(this);
      }
    }
})