mdlr('api:realworld', m => {

  return {

    login: async (email, password) => {
      const result = await fetch(`https://api.realworld.io/api/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { email, password } })
      }).then(r => r.json());

      return result; // todo: change to result.user
    },

    getGlobalFeed: async () => {
      const result = await fetch(`https://api.realworld.io/api/articles`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());

      return result.articles;
    },

    getTags: async () => {
      const result = await fetch(`https://api.realworld.io/api/tags`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json());

      return result.tags;
    },

  };

})