import { validationOption } from "./Validation.js";
import Validation from "./Validation.js";
import Card from "./Card.js";
import {
    cardContainer,
    initialCards,
    profileEditButton,
    popupProfile,
    formProfile,
    profileNameInput,
    profileJobInput,
    profileName,
    profileDescription,
    popupList,
    validationSetting,
    formCard,
    cardNameInput,
    cardLinkInput,
    popupCard,
    cardAddButton,
    popupImage,
    popupImageElement,
    popupImageHead,
} from "./utils.js";

//Включение валидации
const popupProfileCheckValid = new Validation(validationOption, formProfile);
popupProfileCheckValid.enableValidation();

const validationCards = new Validation(validationSetting, formCard);
validationCards.enableValidation();

//Открытие и закрытие попапа
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handlePressEscape);
}

export function closePopup(popup) {
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

// Обработчик клика на карточку
function handleCardClick(name, link) {
    openPopup(popupImage);
    popupImageElement.src = link;
    popupImageHead.alt = name;
    popupImageHead.textContent = name;
}

// Обработчик нажатия "Escape"
const handlePressEscape = (evt) => {
    if (evt.key === "Escape") {
        const popupCurrent = document.querySelector(".popup_opened");
        closePopup(popupCurrent);
    }
};

// Функция создания новой карточки
function createCard(cardName, cardLink) {
    const listItem = new Card(cardName, cardLink, ".template", handleCardClick);
    const newCard = listItem.generate();
    return newCard;
}

//Карточки из коробки
initialCards.forEach((item) => {
    cardContainer.append(createCard(item.name, item.link));
});

function handleSaveCardData(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    cardContainer.prepend(createCard(cardName, cardLink));
    validationCards.deactivateSubmitButton();
    closePopup(popupCard);
    evt.target.reset();
}

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

formCard.addEventListener("submit", handleSaveCardData);

cardAddButton.addEventListener("click", () => {
    validationCards.resetValidation();
    openPopup(popupCard);
});

formProfile.addEventListener("submit", handleFormProfileSubmit);

profileEditButton.addEventListener("click", () => {
    popupProfileCheckValid.resetValidation();
    openPopup(popupProfile);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
});
