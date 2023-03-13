mdlr('[html]realworld-article-meta', m => {

  m.html`
  <div class="article-meta">
    {#if article}
      <a href="#/profile?username={article.author.username}"><img src="{article.author.image}" /></a>
      <div class="info">
        <a href="#/profile?username={article.author.username}" class="author">{article.author.username}</a>
        <span class="date">{formatDate()}</span>
      </div>
      {#if !details}
      <button class="btn {favoriteClass()} btn-sm pull-xs-right" on={click:favoriteClick}>
        <i class="ion-heart" />{article.favoritesCount}
      </button>
      {:else}
      <button class="btn btn-sm {followClass()}" on={click:followClick}>
        <i class="ion-plus-round" />{following()} {article.author.username}
      </button>
      <button class="btn btn-sm {favoriteClass()}" on={click:favoriteClick}>
        <i class="ion-heart" />{favorited()} Article <span class="counter">({article.favoritesCount})</span>
      </button>
      {/if}
    {:else}
      <div>...</div>
    {/if}
  </div>`;

  return class {
    api = null;
    user = null;
    search = null;

    article = null;
    details = false;

    followClass() {
      return this.article?.author?.following ? 'btn-secondary' : 'btn-outline-secondary';
    }

    following() {
      return !this.article?.author?.following ? 'Follow' : 'Unfollow';
    }

    favoriteClass() {
      return this.article?.favorited ? 'btn-primary' : 'btn-outline-primary';
    }

    favorited() {
      return !this.article?.favorited ? 'Favorite' : 'Unfavorite';
    }

    formatDate() {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };

      return new Intl.DateTimeFormat('en-US', options).format(new Date(this.article?.updatedAt || '1970-01-01'));
    }

    async favoriteClick(e) {
      this.search.slug = this.article?.slug;
      const result = await this.api.favoriteArticle(this.user, this.search, !this.article?.favorited);
      delete result.favoritedBy;
      Object.assign(this.article, result);

      // todo: how to redraw this properly?
      m.redirect(`#/article?slug=${this.article.slug}&t=${Date.now()}`);
    }

    followClick(e) {
      console.log('followClick', this.article?.author?.following);
    }
  }

})