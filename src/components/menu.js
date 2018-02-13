import m from 'mithril';
import labels from '../labels';

class Menu {
  view() {
    return m('div', {class: 'container'}, [
      this._insertLink(labels.l_1, '#!/fill-in-bulk'),
      this._insertLink(labels.l_2, '#!/extract-in-bulk-for-docs'),
      this._insertLink(labels.l_3, '#!/extract-in-bulk-for-forms'),
      this._insertLink(labels.l_4, '#!/get-editor-access-links')
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

export default Menu;
