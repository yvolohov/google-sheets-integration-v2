import m from 'mithril';
import documents from '../../models/fill-in-bulk/documents';
import documentLinks from '../../models/fill-in-bulk/document-links';
import documentFields from '../../models/fill-in-bulk/document-fields';
import labels from '../../labels';

class DocumentSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'block form-group'}, [
          m('label', {class: 'bgl', for: 'document-select'}, `${labels.l_5}:`),
          m('select', {
            id: 'document-select',
            style: 'width: 100%; text-align: left;',
            onchange: this._changeHandler.bind(this)
          },
          this._makeTree())
        ])
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'mgl'}, `${labels.l_7}:`),
        m('div', this._prepareId())
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'mgl'}, `${labels.l_8}:`),
        m('div', this._prepareFolder())
      ])
    ]);
  }

  _makeTree() {
    let selectionState = documents.getSelectionState(0);
    let tree = [m('option', {value: 0, selected: selectionState}, '...')];
    let folders = documents.getFoldersTree();

    for (let folderIndex in folders) {
      let currentFolder = folders[folderIndex];
      let folderDocuments = currentFolder.documents;
      let options = [];

      for (let documentIndex in folderDocuments) {
        let currentDocument = folderDocuments[documentIndex];
        let selectionState = documents.getSelectionState(currentDocument.id);

        options.push(m('option', {
          value: currentDocument.id,
          selected: selectionState
        }, currentDocument.name));
      }
      tree.push(m('optgroup', {label: currentFolder.name}, options));
    }
    return tree;
  }

  _prepareId() {
    let selectedDocument = documents.getSelectedDocument();

    if (selectedDocument === null) {
      return m('div', {class: 'ml'}, '...');
    }

    let properties = {
      href: '#',
      class: 'ml',
      onclick: this._linkClickHandler.bind(this, selectedDocument.id)
    };
    return m('a', properties, selectedDocument.id);
  }

  _prepareFolder() {
    let selectedDocument = documents.getSelectedDocument();
    let label = (selectedDocument !== null) ? selectedDocument.folder.name : '...';
    return m('div', {class: 'ml'}, label);
  }

  _changeHandler(event) {
    let documentId = event.target.value;
    let afterRefresh = () => {m.redraw();};
    documents.setSelectedDocumentId(documentId);
    documentFields.refreshFields(documentId, afterRefresh, afterRefresh);
  }

  _linkClickHandler(documentId, event) {
    event.preventDefault();
    documentLinks.loadLink(documentId, 1, 30, (link) => {
      window.open(link.url);
    });
  }
}

export default DocumentSelector;
