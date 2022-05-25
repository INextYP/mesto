import { validationOption } from "./validate.js";
import Validation from "./validate.js";
import Card from "./cards.js";
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
} from "./utils.js";

// Открытие и закрытие поп-апа
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

//Карточки из коробки
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, ".template");
    const cardElement = card.generate();

    cardContainer.append(cardElement);
});

const handlePressEscape = (evt) => {
    if (evt.key === "Escape") {
        const popupCurrent = document.querySelector(".popup_opened");
        closePopup(popupCurrent);
    }
};

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

profileEditButton.addEventListener("click", () => {
    openPopup(popupProfile);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
});

const popupProfileCheckValid = new Validation(validationOption, formProfile);
popupProfileCheckValid.enableValidation();
