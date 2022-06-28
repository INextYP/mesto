import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSaveFormData) {
        super(popupSelector);
        this._handleSaveFormData = handleSaveFormData;
        this._form = this._popupSelector.querySelector(".form");
        this._inputList = this._form.querySelectorAll(".form__item");
        this._submitButton = this._form.querySelector(".form__submit-button");
        this._loadingText = this._submitButton.textContent;
    }

    _getInputValues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSaveFormData(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    getLoadingText(isLoading) {
        if (isLoading) {
            this._submitButton.classList.add("form__submit-button_loading");
            this._submitButton.textContent = `Сохранение...`;
        } else {
            this._submitButton.classList.remove("form__submit-button_loading");
            this._submitButton.textContent = this._loadingText;
        }
    }
}
