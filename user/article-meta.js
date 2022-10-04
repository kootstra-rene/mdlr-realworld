mdlr('[html]realworld-article-meta', m => {

  m.html`
  <div class="article-meta">
    <a href="#/profile?username={article.author.username}"><img src="{article.author.image}" /></a>
    <div class="info">
      <a href="#/profile?username={article.author.username}" class="author">{article.author.username}</a>
      <span class="date">{formatDate()}</span>
    </div>
    {#if !details}
    <button class="btn {buttonClass} btn-sm pull-xs-right">
      <i class="ion-heart" />{article.favoritesCount}
    </button>
    {:else}
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round" />Follow {article.author.username}<span class="counter">(10)</span>
    </button>
    <button class="btn btn-sm {buttonClass}">
      <i class="ion-heart" />{favorited} Post <span class="counter">({article.favoritesCount})</span>
    </button>
    {/if}
  </div>`;

  return class {
    article = null;
    details = false;

    get buttonClass() {
      return this.article?.favorited ? 'btn-primary' : 'btn-outline-primary';
    }

    get favorited() {
      return !this.article?.favorited ? 'Favorite' : 'Unfavorite';
    }

    formatDate() {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };

      return new Intl.DateTimeFormat('en-US', options).format(new Date(this.article?.updatedAt || '1970-01-01'));
    }
  }

})