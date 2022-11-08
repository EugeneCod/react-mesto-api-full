const configApi = {
  BASE_URL: 'https://api.mesto.ekg.nomoredomains.icu',
}

class Api {
  constructor(configApi) {
    this._baseUrl = configApi.BASE_URL;
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._getJsonOrError)
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._getJsonOrError)
    
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._getJsonOrError)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
  }

  changeLikeCardStatus(isLiked, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }
}

const api = new Api(configApi);

export default api;