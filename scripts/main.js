const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const closePopupProfileBtn = document.querySelector('.popup__close-button_place_profile');
const popupProfile = document.querySelector('.popup-profile');
const formProfile = document.querySelector('.form_place_profile');
const profileNameInput = document.querySelector('.form__item_type_user-name');
const profileJobInput = document.querySelector('.form__item_type_user-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const cardContainer = document.querySelector('.gallery__cards');
const templateCardEl = document.querySelector('.template');
const popupCard = document.querySelector('.popup-card');
const formCard = document.querySelector('.form_place_card');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.form__item_type_card-name');
const cardLinkInput = document.querySelector('.form__item_type_card-link');
const closePopupCardBtn = document.querySelector('.popup__close-button_place_card');

const popupImage = document.querySelector('.popup-image');
const closePopupImageBtn = document.querySelector('.popup__close-button_place_image');

// Открытие и закрытие поп-апа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Сохранение данных профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closePopup(popupProfile);
}

// Функция создания новой карточки
function saveCardData(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    const listItem = getCard({name: cardName, link: cardLink});
    cardContainer.prepend(listItem);
    closePopup(popupCard);
}

//Карточки из коробки
function renderCards() {
    const html = initialCards.map(getCard);
    cardContainer.append(...html);
}

function getCard(item) {
    const newCard = templateCardEl.content.cloneNode(true);
    const cardName = newCard.querySelector('.gallery__card-name');
    const cardLink = newCard.querySelector('.gallery__card-img');
    newCard.querySelector('.gallery__delete-btn').addEventListener('click', (event) => {
        const targetEl = event.target;
        const targetItem = targetEl.closest('.gallery__card-item');
        targetItem.remove();
    });

    cardName.textContent = item.name;
    cardLink.src = item.link;
    cardLink.alt = item.name;
    newCard.querySelector('.gallery__card-button-like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('gallery__card-button-like_active');
    });

    cardLink.addEventListener('click', () => {
        openPopup(popupImage);
        const popupImageEl = document.querySelector('.popup__img');
        const popupImageHead = document.querySelector('.popup__img-heading');
        popupImageEl.src = cardLink.src;
        popupImageEl.alt = cardName.textContent;
        popupImageHead.textContent = cardName.textContent;
    });

    cardLink.addEventListener('click', () => openPopup(popupImage));
    return newCard;
}

renderCards();
//Слушатели
formProfile.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', saveCardData);

profileEditButton.addEventListener('click', () => {
    openPopup(popupProfile);
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
});

cardAddBtn.addEventListener('click', () => {
    openPopup(popupCard);
    cardNameInput.value = '';
    cardLinkInput.value = '';
})

closePopupProfileBtn.addEventListener('click', () => closePopup(popupProfile));
closePopupCardBtn.addEventListener('click', () => closePopup(popupCard));
closePopupImageBtn.addEventListener('click', () => closePopup(popupImage));



