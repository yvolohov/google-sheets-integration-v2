import m from 'mithril';
import ListItemFolder from '../common/list-item-folder';
import ListItemOne from '../common/list-item-one';
import labels from '../../labels';

class DocumentsList {
  view(vnode) {
    let documents = vnode.attrs.documents;
    let documentsFields = vnode.attrs.documentsFields;
    let flagName = vnode.attrs.flagName;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_26}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', this._makeTree(documents, documentsFields, flagName))
        ])
      ])
    ]);
  }

  _makeTree(documents, documentsFields, flagName) {
    let tree = [];
    let folders = documents.getFoldersTree();

    for (let folderIndex in folders) {
      let currentFolder = folders[folderIndex];
      let folderDocuments = currentFolder.documents;
      tree.push(m(ListItemFolder, {header: currentFolder.name}));

      for (let documentIndex in folderDocuments) {
        let currentDocument = folderDocuments[documentIndex];

        tree.push(m(ListItemOne, {
          bigHeader: currentDocument.name,
          smallHeader: currentDocument.id,
          clickHandler: this._clickHandler.bind(this, currentDocument.id, documents, documentsFields),
          checked: (currentDocument[flagName]) ? true : null
        }));
      }
    }
    return tree;
  }

  _clickHandler(documentId, documents, documentsFields, event) {
    documents.selectDocument(documentId, event.target.checked);

    if (documentsFields) {
      console.log("refreshed fields " + documentId);
    }
  }
}

export default DocumentsList;
