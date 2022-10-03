mdlr('[html]realworld-article-comments', m => {

  m.html`
    <div class="col-xs-12 col-md-8 offset-md-2">

      {#if !!user}
      <form class="card comment-form">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img src="{user.image}" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
      {/if}

      {#each comment in comments}
      <div class="card">
        <div class="card-block">
          <p class="card-text">{ comment.body }</p>
        </div>
        <div class="card-footer">
          <a href="#/profile" class="comment-author">
            <img src="{ comment.author.image }" class="comment-author-img" />
          </a>
          <a href="#/profile" class="comment-author">{ comment.author.username }</a>
          <span class="date-posted">{ formatDate(comment) }</span>
        </div>
      </div>
      {/each}

    </div>`;

  m.css`
    :root {
      display: contents;
    }`;

  return class {
    api = null;
    user = null;
    options = null;

    comments = null;

    async connected() {
      this.comments = await this.api.getArticleComments(this.options.slug);

      m.redraw(this);
    }

    formatDate(comment) {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };

      return new Intl.DateTimeFormat('en-US', options).format(new Date(comment?.updatedAt || '1970-01-01'));
    }
  }

})