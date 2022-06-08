export default class Card {
    constructor({ data, cardSelector, handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".gallery__card-item")
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element
            .querySelector(".gallery__card-button-like")
            .addEventListener("click", this._handleLikeCardClick);

        this._element
            .querySelector(".gallery__delete-btn")
            .addEventListener("click", this._handleCardDelete);

        this._element
            .querySelector(".gallery__card-img")
            .addEventListener("click", this._handleCardClick);
    }

    _handleLikeCardClick(evt) {
        evt.target.classList.toggle("gallery__card-button-like_active");
    }

    _handleCardDelete(evt) {
        evt.target.closest(".gallery__card-item").remove();
    }

    generate() {
        this._element = this._getElement();
        this._setEventListeners();

        this._element.querySelector(".gallery__card-name").textContent =
            this._name;
        this._element.querySelector(".gallery__card-img").src = this._link;
        this._element.querySelector(".gallery__card-img").alt = this._name;

        return this._element;
    }
}
