// eslint-disable-next-line import/no-anonymous-default-export
export default {
  options: [
    '',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      body: '',
      method: ''
    }
  ],

  __preFlight (opts = { url: '', params: null, body: null }, method) {
    if (method === 'GET') delete this.options[1].body;
    this.options[0] = opts.url;
    this.options[1] = { ...this.options[1], method };
    this.options[0][this.options[0].length - 1] !== '/' && (this.options[0] = `${opts.url}/`);
    if (opts.params) {
      opts.url += '?';
      for (const key in opts.params) opts.url += `${key}=${opts.params[key]}`;
    }
    if (opts.body) this.options[1].body = JSON.stringify(opts.body);
  },

  async __forwardFetch (opts = { url: '', params: null, body: null }, method = 'GET') {
    this.__preFlight(opts, method);
    return await (await window.fetch(...this.options)).json();
  },

  async get (url, params) {
    return await this.__forwardFetch({ url, params });
  },

  async post (url, body) {
    return await this.__forwardFetch({ url, body }, 'POST');
  },

  async put (url, body) {
    return await this.__forwardFetch({ url, body }, 'PUT');
  },

  async patch (url, body) {
    return await this.__forwardFetch({ url, body }, 'PATCH');
  },

  async delete (url, body) {
    return await this.__forwardFetch({ url, body }, 'DELETE');
  }
};
