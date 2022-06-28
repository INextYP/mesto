export default class Card {
    constructor({
        data,
        ownerId,
        userId,
        cardId,
        likes,
        cardSelector,
        handleCardClick,
        handleCardDelete,
        handleLikeClick,
    }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._ownerId = ownerId;
        this._userId = userId;
        this._cardId = cardId;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeClick = handleLikeClick;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".gallery__card-item")
            .cloneNode(true);

        return cardElement;
    }

    generate() {
        this._element = this._getElement();
        this._cardImage = this._element.querySelector(".gallery__card-img");
        this._cardName = this._element.querySelector(".gallery__card-name");
        this._cardLikeButton = this._element.querySelector(
            ".gallery__card-button-like"
        );
        this._cardDeleteButton = this._element.querySelector(
            ".gallery__delete-btn"
        );
        this._likeCount = this._element.querySelector(
            ".gallery__card-like-count"
        );

        this._likeCount.textContent = this._likes.length;

        if (this._ownerId !== this._userId) {
            this._cardDeleteButton.style.display = "none";
        }

        if (this._likes.some((item) => item._id === this._ownerId)) {
            this._isLiked = true;
            this._cardLikeButton.classList.add(
                "gallery__card-button-like_active"
            );
        } else {
            this._isLiked = false;
        }

        this._setEventListeners();

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        return this._element;
    }

    // isLike() {
    //     return this._likes.find((item) => item === this._userId);
    // }

    setLikes(likeCountNew) {
        this._cardLikeButton.classList.add("gallery__card-button-like_active");
        this._likeCount.textContent = likeCountNew.length;
        this._isLiked = true;
        // this._likes = likeCountNew;
    }

    unsetLikes(likeCountNew) {
        this._cardLikeButton.classList.remove(
            "gallery__card-button-like_active"
        );
        this._likeCount.textContent = likeCountNew.length;
        this._isLiked = false;
        // this._likes = likeCountNew;
    }

    //_handleLikeCardClick() {
    //this._cardLikeButton.classList.toggle(
    //"gallery__card-button-like_active"
    //);
    //}

    handleCardDelete() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener("click", () =>
            this._handleLikeClick(this._cardId)
        );
        this._cardDeleteButton.addEventListener("click", () =>
            this._handleCardDelete(this._data)
        );
        this._cardImage.addEventListener("click", this._handleCardClick);
    }
}
