import m from 'mithril';
import documents from '../models/documents';

class RowDocumentSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'block form-group'}, [
          m('label', {class: 'gray', for: 'document-select'}, vnode.attrs.selectLabel + ':'),
          m('select', {id: 'document-select', style: 'width: 100%; text-align: left;'}, this._makeTree())
        ])
      ])
    ]);
  }

  _makeTree() {
    let tree = [m('option', {value: '0', selected: 'selected'}, '...')];
    let folders = documents.getFoldersTree();

    for (let folderIndex in folders) {
      let currentFolder = folders[folderIndex];
      let documents = currentFolder.documents;
      let options = [];

      for (let documentIndex in documents) {
        let currentDocument = documents[documentIndex];
        options.push(m('option', {value: currentDocument.id}, currentDocument.name));
      }
      tree.push(m('optgroup', {label: currentFolder.name}, options));
    }
    return tree;
  }
}

export default RowDocumentSelector;
