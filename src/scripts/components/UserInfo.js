export default class UserInfo {
    constructor({
        userNameSelector,
        userDescriptionSelector,
        userAvatarSelector,
    }) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileDescription = document.querySelector(
            userDescriptionSelector
        );
        this._userAvatarSelector = document.querySelector(userAvatarSelector);
    }
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent,
        };
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        this._userAvatarSelector.style.backgroundImage = `url(${data.avatar})`;
    }

    setUserAvatar(data) {
        this._userAvatarSelector.style.backgroundImage = `url(${data.avatar})`;
    }
}
