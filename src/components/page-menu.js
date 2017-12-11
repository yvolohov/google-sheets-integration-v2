import m from 'mithril';

class PageMenu {
  view() {
    return m('div', {class: 'container'}, [
      this._insertButton(
        'Make filled documents from selected cells',
        this._clickHandler.bind(this, '/page-fill-in-bulk')
      ),
      this._insertButton(
        'Extract data from filled documents to the sheet',
        this._clickHandler.bind(this, '/page-get-document-fields')
      ),
      this._insertButton(
        'Extract data from filled forms to the sheet',
        this._clickHandler.bind(this, '/page-get-form-fields')
      ),
      this._insertButton(
        'Get editor access links for documents',
        this._clickHandler.bind(this, '/page-get-editor-access-link')
      )
    ]);
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

export default PageMenu;
