export default class Api {
    constructor(setting) {
        this._address = setting.baseUrl;
        this._headers = setting.headers;
    }

    getInitialCards() {
        return fetch(this._address + `/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    getUserInfo() {
        return fetch(this._address + `/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    setUserInfo(profileData) {
        return fetch(this._address + `/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.userName,
                about: profileData.userDescription,
            }),
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    addNewCard(cardData) {
        return fetch(this._address + `/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            }),
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    deleteCard(id) {
        return fetch(this._address + `/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    addLike(id) {
        return fetch(this._address + `/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    deleteLike(id) {
        return fetch(this._address + `/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }

    editProfileAvatar(data) {
        return fetch(this._address + `/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatarLink,
            }),
        }).then((response) =>
            response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`)
        );
    }
}
