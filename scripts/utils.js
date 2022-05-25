export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

export const validationSetting = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_inactive",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__item-error_active",
};

export const popupCard = document.querySelector(".popup-card");
export const popupImage = document.querySelector(".popup-image");
export const cardAddButton = document.querySelector(".profile__add-button");

export const cardContainer = document.querySelector(".gallery__cards");
export const formCard = document.querySelector(".form_place_card");
export const cardNameInput = document.querySelector(
    ".form__item_type_card-name"
);
export const cardLinkInput = document.querySelector(
    ".form__item_type_card-link"
);

export const profileEditButton = document.querySelector(
    ".profile__edit-button"
);
export const popupProfile = document.querySelector(".popup-profile");
export const formProfile = document.querySelector(".form_place_profile");
export const profileNameInput = document.querySelector(
    ".form__item_type_user-name"
);
export const profileJobInput = document.querySelector(
    ".form__item_type_user-description"
);
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
    ".profile__description"
);

export const popupList = document.querySelectorAll(".popup");
