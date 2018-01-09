import m from 'mithril';
import BaseSelector from '../common/base-selector';
import documents from '../../models/documents';
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
      ])
    ]);
  }

  _changeHandler(event) {
    let documentId = event.target.value;
    documents.setSelectedDocumentId(documentId);
    documentFields.setFields(documentId, () => {m.redraw();});
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
}

export default RowDocumentSelector;
