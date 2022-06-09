import "../pages/index.css";

import Validation from "../scripts/components/Validation.js";
import Card from "../scripts/components/Card.js";
import {
    initialCards,
    profileEditButton,
    formProfile,
    profileNameInput,
    profileJobInput,
    validationOption,
    formCard,
    cardAddButton,
    cardDefaultContainer,
} from "../scripts/utils/constants.js";

import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";

const userInfoValues = new UserInfo({
    userNameSelector: ".profile__name",
    userDescriptionSelector: ".profile__description",
});

const cardList = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            const card = createCard(item, ".template");
            cardList.addItem(card);
        },
    },
    cardDefaultContainer
);

cardList.renderItems();

const popupProfileCheckValid = new Validation(validationOption, formProfile);
popupProfileCheckValid.enableValidation();

const validationCards = new Validation(validationOption, formCard);
validationCards.enableValidation();

const popupProfileNew = new PopupWithForm(".popup-profile", {
    handleSaveFormData: (data) => {
        userInfoValues.setUserInfo(data["userName"], data["userDescription"]);
        popupProfileNew.close();
    },
});

const popupImageOpen = new PopupWithImage(".popup-image");
popupImageOpen.setEventListeners();

function createCard(item, cardSelector) {
    const card = new Card({
        data: item,
        cardSelector,
        handleCardClick: () => {
            popupImageOpen.open(item.name, item.link);
        },
    });
    return card.generate();
}

const popupCardNew = new PopupWithForm(".popup-card", {
    handleSaveFormData: (dataCard) => {
        const card = createCard(dataCard, ".template");
        cardList.addItemPrepend(card);
        popupCardNew.close();
    },
});

cardAddButton.addEventListener("click", () => {
    validationCards.resetValidation();
    popupCardNew.open();
});

profileEditButton.addEventListener("click", () => {
    popupProfileCheckValid.resetValidation();
    const { name, description } = userInfoValues.getUserInfo();
    profileNameInput.value = name;
    profileJobInput.value = description;
    popupProfileNew.open();
});

popupCardNew.setEventListeners();
popupProfileNew.setEventListeners();
