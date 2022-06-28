export default class Section {
    constructor({ renderer }, containerSelector) {
        // this._renderedItems = data;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }
    addItem(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
    // renderItems() {
    //     this._renderedItems.forEach(this._renderer);
    // }
}
