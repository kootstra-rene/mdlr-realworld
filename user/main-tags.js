mdlr('[html]realworld-main-tags', m => {

  m.html`
    <div class="sidebar">
      <p>Popular Tags</p>

      <div class="tag-list">
      {#each tag in tags}
        <a href="" class="tag-pill tag-default">{tag}</a>
      {:else}
        <span>loading tags...</span>
      {/each}
      </div>
    </div>`;

  return class {
    api = null;
    tags = [];

    async connected() {
      this.tags = await this.api.getTags();

      m.redraw(this);
    }
  }
})