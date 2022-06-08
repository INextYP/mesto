import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSaveFormData }) {
        super(popupSelector);
        this._handleSaveFormData = handleSaveFormData;
        this._form = this._popupSelector.querySelector(".form");
        this._inputList = this._form.querySelectorAll(".form__item");
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
}
