import m from 'mithril';
import labels from '../labels';

class PageMenu {
  view() {
    return m('div', {class: 'container'}, [
      this._insertLink(labels.l_1, '#!/page-fill-in-bulk'),
      this._insertLink(labels.l_2, '#!/page-get-document-fields'),
      this._insertLink(labels.l_3, '#!/page-get-form-fields'),
      this._insertLink(labels.l_4, '#!/page-get-editor-access-link')
    ]);
  }

  _insertLink(text, url) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('b', m('a', {href: url, target: '_self'}, text))
      ])
    ]);
  }
}

export default PageMenu;
