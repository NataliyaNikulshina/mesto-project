export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  setItemAppend(item) {
    this._container.append(item);
  }

  setItemPrepend(item) {
    this._container.prepend(item);
  }

  rendererItems(data, item) {
    console.log(data, item);
    if (item) {
      this._renderer(item) ;
    } else {
      data.forEach((it) => {
        this._renderer(it);
      });
    }
  }
}
