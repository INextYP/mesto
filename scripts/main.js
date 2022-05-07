const validationSetting = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_inactive",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__item-error_active",
};

const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const formProfile = document.querySelector(".form_place_profile");
const profileNameInput = document.querySelector(".form__item_type_user-name");
const profileJobInput = document.querySelector(
    ".form__item_type_user-description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardContainer = document.querySelector(".gallery__cards");
const templateCardElement = document.querySelector(".template");
const popupCard = document.querySelector(".popup-card");
const formCard = document.querySelector(".form_place_card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".form__item_type_card-name");
const cardLinkInput = document.querySelector(".form__item_type_card-link");
const popupImage = document.querySelector(".popup-image");
const popupImageElement = document.querySelector(".popup__img");
const popupImageHead = document.querySelector(".popup__img-heading");

const popupList = document.querySelectorAll(".popup");

// Открытие и закрытие поп-апа
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handlePressEscape);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handlePressEscape);
}

// Сохранение данных профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closePopup(popupProfile);
}

// Функция создания новой карточки
function handleSaveCardData(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    const listItem = getCard({ name: cardName, link: cardLink });
    const buttonElement = formCard.querySelector(".form__submit-button");
    cardContainer.prepend(listItem);
    deactivateSubmitButton(buttonElement, validationSetting);
    closePopup(popupCard);
    evt.target.reset();
}

// Обработчик лайка
function handleLikeClick(evt) {
    evt.target.classList.toggle("gallery__card-button-like_active");
}

// Обработчик удаления
function handleCardDelete(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest(".gallery__card-item");
    targetItem.remove();
}

//Карточки из коробки
function renderCards() {
    const html = initialCards.map(getCard);
    cardContainer.append(...html);
}

function getCard(item) {
    const newCard = templateCardElement.content.cloneNode(true);
    const cardName = newCard.querySelector(".gallery__card-name");
    const cardImage = newCard.querySelector(".gallery__card-img");
    newCard
        .querySelector(".gallery__delete-btn")
        .addEventListener("click", handleCardDelete);

    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    newCard
        .querySelector(".gallery__card-button-like")
        .addEventListener("click", handleLikeClick);

    cardImage.addEventListener("click", () => {
        openPopup(popupImage);
        popupImageElement.src = cardImage.src;
        popupImageElement.alt = cardName.textContent;
        popupImageHead.textContent = cardName.textContent;
    });
    return newCard;
}
const handlePressEscape = (evt) => {
    if (evt.key === "Escape") {
        const popupCurrent = document.querySelector(".popup_opened");
        closePopup(popupCurrent);
    }
};

renderCards();
//Слушатели
popupList.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close-button")) {
            closePopup(popup);
        }
    });
});

formProfile.addEventListener("submit", handleFormProfileSubmit);
formCard.addEventListener("submit", handleSaveCardData);

profileEditButton.addEventListener("click", () => {
    openPopup(popupProfile);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
});

cardAddButton.addEventListener("click", () => openPopup(popupCard));
