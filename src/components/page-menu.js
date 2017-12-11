import m from 'mithril';

class PageMenu {
  view() {
    return m('div', {class: 'container'}, [
      this._insertButton('Function #1'),
      this._insertButton('Function #2'),
      this._insertButton('Function #3'),
      this._insertButton('Function #4')
    ]);
  }

  _insertButton(text) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('button', {style: 'width: 100%'}, text)
      ])
    ]);
  }
}

export default PageMenu;
