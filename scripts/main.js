// Открытие и закрытие поп-апа
let profileEditButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button')
let popupProfile = document.querySelector('.popup');

function openPopup() {
    popupProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup() {
    popupProfile.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup); 

// Сохранение данных профиля
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__item_type_user-name');
let jobInput = document.querySelector('.form__item_type_user-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');  

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);