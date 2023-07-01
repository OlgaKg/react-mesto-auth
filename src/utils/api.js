class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkReply(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    _request(url, options) {
        return fetch(`${this._baseUrl}/${url}`, options).then(this._checkReply)
    }


    getUserData() {
        return this._request(`users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }

    updateUserData(data) {
        return this._request(`users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    updateAvatar(data) {
        return this._request(`users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    getCards() {
        return this._request(`cards`, {
            method: 'GET',
            headers: this._headers
        })
    }

    addNewCard(data) {
        return this._request(`cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    addLikeCard(idCard) {
        return this._request(`cards/${idCard}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    removeLikeCard(idCard) {
        return this._request(`cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    changeLikeCardStatus(idCard, isLiked) {
        if (isLiked) {
            return this.addLikeCard(idCard);
        } else {
            return this.removeLikeCard(idCard);
        }
    }

    deleteCard(idCard) {
        return this._request(`cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
    headers: {
        authorization: '36c21e13-089d-4ac8-bd26-b85419c729aa',
        'Content-Type': 'application/json'
    }
});

export default api;