const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupCloseBtn = document.querySelector('.popup__close-button_place_profile');
const popupProfile = document.querySelector('.popup-profile');
const formProfile = document.querySelector('.form_place_profile');
const profileNameInput = document.querySelector('.form__item_type_user-name');
const profileJobInput = document.querySelector('.form__item_type_user-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const cardContainer = document.querySelector('.gallery__cards');
const templateCardElement = document.querySelector('.template');
const popupCard = document.querySelector('.popup-card');
const formCard = document.querySelector('.form_place_card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.form__item_type_card-name');
const cardLinkInput = document.querySelector('.form__item_type_card-link');
const cardPopupCloseBtn = document.querySelector('.popup__close-button_place_card');

const popupImage = document.querySelector('.popup-image');
const imagePopupCloseBtn = document.querySelector('.popup__close-button_place_image');
const popupImageElement = document.querySelector('.popup__img');
const popupImageHead = document.querySelector('.popup__img-heading');

// Открытие и закрытие поп-апа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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
    const listItem = getCard({name: cardName, link: cardLink});
    cardContainer.prepend(listItem);
    closePopup(popupCard);
}

// Обработчик лайка
function handleLikeClick(evt) {
    evt.target.classList.toggle('gallery__card-button-like_active');
}

// Обрвботчик удаления
function handleCardDelete(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest('.gallery__card-item');
    targetItem.remove();
}

//Карточки из коробки
function renderCards() {
    const html = initialCards.map(getCard);
    cardContainer.append(...html);
}

function getCard(item) {
    const newCard = templateCardElement.content.cloneNode(true);
    const cardName = newCard.querySelector('.gallery__card-name');
    const cardImage = newCard.querySelector('.gallery__card-img');
    newCard.querySelector('.gallery__delete-btn').addEventListener('click', handleCardDelete);

    cardName.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    newCard.querySelector('.gallery__card-button-like').addEventListener('click', handleLikeClick);

    cardImage.addEventListener('click', () => {
        openPopup(popupImage);
        popupImageElement.src = cardImage.src;
        popupImageElement.alt = cardName.textContent;
        popupImageHead.textContent = cardName.textContent;
    });
    return newCard;
}

renderCards();
//Слушатели
formProfile.addEventListener('submit', handleFormProfileSubmit);
formCard.addEventListener('submit', handleSaveCardData);

profileEditButton.addEventListener('click', () => {
    openPopup(popupProfile);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
});

cardAddButton.addEventListener('click', () => {
    openPopup(popupCard);
    formCard.reset();
})

profilePopupCloseBtn.addEventListener('click', () => closePopup(popupProfile));
cardPopupCloseBtn.addEventListener('click', () => closePopup(popupCard));
imagePopupCloseBtn.addEventListener('click', () => closePopup(popupImage));



