mdlr('api:realworld', m => {

  function buildHeaders(user) {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (user) {
      headers.authorization = `Token ${user.token}`;
    }
    return headers;
  }

  return {

    login: async (email, password) => {
      const result = await fetch(`https://api.realworld.io/api/users/login`, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify({ user: { email, password } })
      }).then(r => r.json());

      return result; // todo: change to result.user
    },

    signup: async (email, password, username) => {
      const result = await fetch(`https://api.realworld.io/api/users`, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify({ user: { email, password, username } })
      }).then(r => r.json());

      return result;
    },

    getArticles: async (user, options) => {
      let queryString = `limit=10&offset=0`;
      if (options.tag) queryString = `tag=${options.tag}&${queryString}`;
      if (options.username) queryString = `author=${options.username}&${queryString}`;
      const result = await fetch(`https://api.realworld.io/api/articles?${queryString}`, {
        headers: buildHeaders(user)
      }).then(r => r.json());

      return result.articles;
    },

    getArticle: async (user, options) => {
      const result = await fetch(`https://api.realworld.io/api/articles/${options.slug}`, {
        headers: buildHeaders(user)
      }).then(r => r.json());

      return result.article;
    },

    favoriteArticle: async (user, options, favorite) => {
      const result = await fetch(`https://api.realworld.io/api/articles/${options.slug}/favorite`, {
        method: favorite ? 'post' : 'delete',
        headers: buildHeaders(user)
      }).then(r => r.json());

      return result.article;
    },

    getArticleComments: async (user, options) => {
      const result = await fetch(`https://api.realworld.io/api/articles/${options.slug}/comments`, {
        headers: buildHeaders(user)
      }).then(r => r.json());

      return result.comments;
    },

    getTags: async (user, options) => {
      const result = await fetch(`https://api.realworld.io/api/tags`, {
        headers: buildHeaders(user)
      }).then(r => r.json());

      return result.tags;
    },

    getProfile: async (user, options) => {
      const result = await fetch(`https://api.realworld.io/api/profiles/${options.username}`, {
        headers: buildHeaders(user)
      }).then(r => r.json());

      return result.profile;
    },

    updateProfile: async (user, details) => {
      const result = await fetch(`https://api.realworld.io/api/user`, {
        method: 'put',
        headers: buildHeaders(user),
        body: JSON.stringify({ user: details })
      }).then(r => r.json());

      return result;
    },

  };

})