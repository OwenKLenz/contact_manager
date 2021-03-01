class AJAXRequests {
  static get(path) {
    return fetch(path);
  }

  static post(path, data) {
    return fetch(path, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  static put(path, data) {
    return fetch(path, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  static remove(path) {
    return fetch(path, { method: 'DELETE' });
  }
}
