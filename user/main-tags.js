mdlr('[html]realworld-main-tags', m => {

  m.html`
    <div class="sidebar">
      <p>Popular Tags</p>

      <div class="tag-list">
      {#each tag in tags}
        <a href="#/?tag={tag}" class="tag-pill tag-default">{tag}</a>
      {:else}
        <span>loading tags...</span>
      {/each}
      </div>
    </div>`;

  return class {
    api = null;
    user = null;
    tags = [];

    async connected() {
      this.tags = await this.api.getTags(this.user);

      m.redraw(this);
    }
  }
})