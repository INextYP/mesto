export const validationOption = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_inactive",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__item-error_active",
};

export default class Validation {
    constructor(validationData, formType) {
        this._validationData = validationData;
        this._formType = formType;
    }

    _showInputError(formInput) {
        const errorElement = this._formType.querySelector(
            `.${formInput.id}-error`
        );
        formInput.classList.add(this._validationData.inputErrorClass);
        errorElement.textContent = formInput.validationMessage;
        errorElement.classList.add(this._validationData.errorClass);
    }

    _hideInputError(formInput) {
        const errorElement = this._formType.querySelector(
            `.${formInput.id}-error`
        );
        formInput.classList.remove(this._validationData.inputErrorClass);
        errorElement.classList.remove(this._validationData.errorClass);
        errorElement.textContent = "";
    }

    _isValid(formInput) {
        if (!formInput.validity.valid) {
            this._showInputError(formInput);
        } else {
            this._hideInputError(formInput);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(
                this._validationData.inactiveButtonClass
            );
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(
                this._validationData.inactiveButtonClass
            );
            buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        const inputList = Array.from(
            this._formType.querySelectorAll(this._validationData.inputSelector)
        );
        const buttonElement = this._formType.querySelector(
            this._validationData.submitButtonSelector
        );
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    deactivateSubmitButton(buttonElement) {
        buttonElement.classList.add(this._validationData.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    }

    enableValidation() {
        this._setEventListeners();
    }
}
