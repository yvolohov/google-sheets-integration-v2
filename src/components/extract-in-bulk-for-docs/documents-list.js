import m from 'mithril';
import documents from '../../models/extract-in-bulk-for-docs/documents';
import labels from '../../labels';

const SCROLL_BOX_STYLES = `width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`;

class DocumentsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray'}, `${labels.l_26}:`),
        m('div', {style: SCROLL_BOX_STYLES}, [
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
