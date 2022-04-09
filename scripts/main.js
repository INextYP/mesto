let profileEditButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popupProfile = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__item_type_user-name');
let jobInput = document.querySelector('.form__item_type_user-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');  

// Открытие и закрытие поп-апа
function openPopup() {
    popupProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup() {
    popupProfile.classList.remove('popup_opened');
}

// Сохранение данных профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

//Слушатели
formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup); 
