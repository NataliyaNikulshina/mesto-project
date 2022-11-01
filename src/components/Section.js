export default class Section {
  constructor({ data, renderer }, container) {
    this._data = data;
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
      this._renderer(item) ;
    } else {
      this._data.forEach((item) => {
        this._renderer(item);
      });
    }
  }
}
