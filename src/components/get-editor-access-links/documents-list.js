import m from 'mithril';
import documents from '../../models/get-editor-access-links/documents';
import labels from '../../labels';

class DocumentsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_26}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', this._makeList())
        ])
      ])
    ]);
  }

  _makeList() {
    return [];
  }
}

export default DocumentsList;
