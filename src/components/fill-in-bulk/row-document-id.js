import m from 'mithril';
import documents from '../../models/documents';
import documentLinks from '../../models/document-links';
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

  _clickHandler(documentId, event) {
    event.preventDefault();
    documentLinks.loadLink(documentId, 1, 30, (link) => {
      window.open(link.url);
    });
  }

  _prepareId() {
    let selectedDocument = documents.getSelectedDocument();

    return (selectedDocument !== null)
      ? m('a', {href: '#', onclick: this._clickHandler.bind(this, selectedDocument.id)}, selectedDocument.id)
      : '...';
  }
}

export default RowDocumentId;
