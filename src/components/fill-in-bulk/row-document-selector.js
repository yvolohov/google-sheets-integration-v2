import m from 'mithril';
import BaseSelector from '../common/base-selector';
import documents from '../../models/documents';
import documentLinks from '../../models/document-links';
import documentFields from '../../models/document-fields';
import labels from '../../labels';

class RowDocumentSelector extends BaseSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'block form-group'}, [
          m('label', {class: 'gray', for: 'document-select'}, `${labels.l_5}:`),
          m('select', {
            id: 'document-select',
            style: 'width: 100%; text-align: left;',
            onchange: this._changeHandler.bind(this)
          },
          this._makeTree())
        ])
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'gray'}, `${labels.l_7}:`),
        m('div', {style: 'height: 25px;'}, this._prepareId())
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'gray'}, `${labels.l_8}:`),
        m('div', {style: 'height: 25px;'}, this._prepareFolder())
      ])
    ]);
  }

  _makeTree() {
    let selectedDocumentId = documents.getSelectedDocumentId();
    let settings = this._makeOptionSettings(0, selectedDocumentId);
    let tree = [m('option', settings, '...')];
    let folders = documents.getFoldersTree();

    for (let folderIndex in folders) {
      let currentFolder = folders[folderIndex];
      let documents = currentFolder.documents;
      let options = [];

      for (let documentIndex in documents) {
        let currentDocument = documents[documentIndex];
        let settings = this._makeOptionSettings(currentDocument.id, selectedDocumentId);
        options.push(m('option', settings, currentDocument.name));
      }
      tree.push(m('optgroup', {label: currentFolder.name}, options));
    }
    return tree;
  }

  _prepareId() {
    let selectedDocument = documents.getSelectedDocument();

    return (selectedDocument !== null)
      ? m('a', {href: '#', onclick: this._clickHandler.bind(this, selectedDocument.id)}, selectedDocument.id)
      : '...';
  }

  _prepareFolder() {
    let selectedDocument = documents.getSelectedDocument();
    return (selectedDocument !== null) ? selectedDocument.folder.name : '...';
  }  

  _changeHandler(event) {
    let documentId = event.target.value;
    documents.setSelectedDocumentId(documentId);
    documentFields.setFields(documentId, () => {m.redraw();});
  }

  _clickHandler(documentId, event) {
    event.preventDefault();
    documentLinks.loadLink(documentId, 1, 30, (link) => {
      window.open(link.url);
    });
  }
}

export default RowDocumentSelector;
