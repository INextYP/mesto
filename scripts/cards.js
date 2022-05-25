import Validation from "./validate.js";
import { openPopup, closePopup } from "./main.js";
import {
    popupCard,
    popupImage,
    cardAddButton,
    validationSetting,
    cardContainer,
    formCard,
    cardNameInput,
    cardLinkInput,
} from "./utils.js";

const validationCards = new Validation(validationSetting, formCard);

export default class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
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
            .addEventListener("click", () => {
                const popupImageElement = document.querySelector(".popup__img");
                const popupImageHead = document.querySelector(
                    ".popup__img-heading"
                );
                openPopup(popupImage);
                popupImageElement.src = this._link;
                popupImageElement.alt = this._name;
                popupImageHead.textContent = this._name;
            });
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

// Функция создания новой карточки
function handleSaveCardData(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    const listItem = new Card(cardName, cardLink, ".template");
    const newCard = listItem.generate();
    cardContainer.prepend(newCard);
    const buttonElement = formCard.querySelector(".form__submit-button");
    validationCards.deactivateSubmitButton(buttonElement);
    closePopup(popupCard);
    evt.target.reset();
}

validationCards.enableValidation();
formCard.addEventListener("submit", handleSaveCardData);
cardAddButton.addEventListener("click", () => openPopup(popupCard));
