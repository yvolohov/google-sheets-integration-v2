import m from 'mithril';
import documents from '../../models/extract-in-bulk-for-docs/documents';
import labels from '../../labels';

class DocumentsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray'}, `${labels.l_26}:`),
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
