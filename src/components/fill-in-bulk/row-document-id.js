import m from 'mithril';
import documents from '../../models/documents';
import labels from '../../labels';

class RowDocumentId {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'gray'}, `${labels.l_7}:`),
        m('div', {style: 'height: 25px;'}, this._prepareId())
      ])
    ]);
  }

  _prepareId() {
    let selectedDocument = documents.getSelectedDocument();
    return (selectedDocument !== null) ? selectedDocument.id : '...';
  }
}

export default RowDocumentId;
