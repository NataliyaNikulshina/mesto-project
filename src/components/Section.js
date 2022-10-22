export default class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }

  setItem(item) {
    this._container.append(item);
  }

  rendererItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
