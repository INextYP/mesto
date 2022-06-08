export default class Validation {
    constructor(validationData, formType) {
        this._validationData = validationData;
        this._formType = formType;
        this._inputList = Array.from(
            this._formType.querySelectorAll(this._validationData.inputSelector)
        );
        this._buttonElement = this._formType.querySelector(
            this._validationData.submitButtonSelector
        );
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

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(
                this._validationData.inactiveButtonClass
            );
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(
                this._validationData.inactiveButtonClass
            );
            this._buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    deactivateSubmitButton() {
        this._buttonElement.classList.add(
            this._validationData.inactiveButtonClass
        );
        this._buttonElement.setAttribute("disabled", true);
    }

    enableValidation() {
        this._setEventListeners();
    }
}
