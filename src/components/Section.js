export default class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }

  setItemAppend(item) {
    this._container.append(item);
  }

  setItemPrepend(item) {
    this._container.prepend(item);
  }

  rendererItems(item) {
    if (item) {
      this._renderer(item) 
    } else {
      this._items.forEach((item) => {
        this._renderer(item);
      });
    }
  }
}
