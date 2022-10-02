mdlr('[html]realworld-article-comments', m => {

  m.html`
    <div class="col-xs-12 col-md-8 offset-md-2">

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

      {#each comment in comments}
      <div class="card">
        <div class="card-block">
          <p class="card-text">{comment.body}</p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img src="{comment.author.image}" class="comment-author-img" />
          </a>
          <a href="" class="comment-author">{comment.author.username}</a>
          <span class="date-posted">Dec 29th</span>
        </div>
      </div>
      {/each}

    </div>
  `;

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
      console.log(this.comments);
      m.redraw(this);
    }
  }

})