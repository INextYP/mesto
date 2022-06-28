import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupFormCurrent = this._popupSelector.querySelector(".form");
    }

    submitHandler(submitAction) {
        this.submitHandler = submitAction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormCurrent.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.submitHandler();
        });
    }
}
