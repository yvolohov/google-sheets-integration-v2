import m from 'mithril';

class ButtonToMenu {
  view() {
    return this._insertButton(
      'Go to the head menu',
      this._clickHandler.bind(this, '/page-menu')
    );
  }

  _insertButton(text, callback) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('button', {style: 'width: 100%', onclick: callback}, text)
      ])
    ]);
  }

  _clickHandler(page) {
    window.location = '#!' + page;
  }
}

export default ButtonToMenu;
