export default class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector }) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileDescription = document.querySelector(
            userDescriptionSelector
        );
    }
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent,
        };
    }

    setUserInfo(name, description) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }
}
