import "../pages/index.css";

import Validation from "../scripts/components/Validation.js";
import Card from "../scripts/components/Card.js";
import {
    profileEditButton,
    formProfile,
    profileNameInput,
    profileJobInput,
    validationOption,
    formCard,
    cardAddButton,
    cardDefaultContainer,
    formAvatarEdit,
    avatarEdit,
} from "../scripts/utils/constants.js";

import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

let userId;

const cardList = new Section(
    {
        renderer: (data) => {
            const card = createCard(data, ".template");
            cardList.addItem(card);
        },
    },
    cardDefaultContainer
);

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
    headers: {
        authorization: "7251402c-a9d4-40f3-9f0f-0b63cb0824a5",
        "Content-Type": "application/json",
    },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfoValues.setUserInfo(userData);
        cards.reverse();
        cardList.renderItems(cards);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));

//Редактирование информации о пользователе
const popupProfileNew = new PopupWithForm(
    ".popup-profile",
    (handleSaveFormData) => {
        popupProfileNew.getLoadingText(true);
        api.setUserInfo(handleSaveFormData)
            .then((newData) => {
                userInfoValues.setUserInfo(newData);
                popupProfileNew.close();
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
            .finally(() => {
                popupProfileNew.getLoadingText(false);
            });
    }
);

//Добавление новой карточки
const popupCardNew = new PopupWithForm(".popup-card", (handleSaveFormData) => {
    popupCardNew.getLoadingText(true);
    api.addNewCard(handleSaveFormData)
        .then((newCard) => {
            const card = createCard(newCard, ".template");
            cardList.addItemPrepend(card);
            popupCardNew.close();
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
            popupCardNew.getLoadingText(false);
        });
});

const popupAvatarNew = new PopupWithForm(
    ".popup-avatar",
    (handleSaveFormData) => {
        popupAvatarNew.getLoadingText(true);
        api.editProfileAvatar(handleSaveFormData)
            .then((res) => {
                userInfoValues.setUserAvatar(res);
                popupAvatarNew.close();
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
            .finally(() => {
                popupAvatarNew.getLoadingText(false);
            });
    }
);

//Реализация попапа подтверждения удаления
const popupDeleteConfirm = new PopupWithConfirmation(".popup-delete-confirm");
popupDeleteConfirm.setEventListeners();

const userInfoValues = new UserInfo({
    userNameSelector: ".profile__name",
    userDescriptionSelector: ".profile__description",
    userAvatarSelector: ".profile__avatar",
});

const popupProfileCheckValid = new Validation(validationOption, formProfile);
popupProfileCheckValid.enableValidation();

const validationCards = new Validation(validationOption, formCard);
validationCards.enableValidation();

const popupAvatarCheckValid = new Validation(validationOption, formAvatarEdit);
popupAvatarCheckValid.enableValidation();

const popupImageOpen = new PopupWithImage(".popup-image");
popupImageOpen.setEventListeners();

function createCard(item, cardSelector) {
    const card = new Card({
        data: item,
        ownerId: item.owner._id,
        userId: userId,
        cardId: item._id,
        likes: item.likes,
        cardSelector,
        handleCardClick: () => {
            popupImageOpen.open(item.name, item.link);
        },
        handleCardDelete: (newCard) => {
            popupDeleteConfirm.open();
            popupDeleteConfirm.submitHandler(() => {
                api.deleteCard(newCard._id)
                    .then((res) => {
                        card.handleDeleteCard();
                        popupDeleteConfirm.close();
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            });
        },
        handleLikeClick: () => {
            if (card._isLiked) {
                api.deleteLike(item._id)
                    .then((res) => {
                        card.unsetLikes(res.likes);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            } else {
                api.addLike(item._id)
                    .then((res) => {
                        card.setLikes(res.likes);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            }
        },
    });
    const newCard = card.generate();
    return newCard;
}

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

avatarEdit.addEventListener("click", () => {
    formAvatarEdit.reset();
    popupAvatarCheckValid.resetValidation();
    popupAvatarNew.open();
});

popupCardNew.setEventListeners();
popupProfileNew.setEventListeners();
popupAvatarNew.setEventListeners();
