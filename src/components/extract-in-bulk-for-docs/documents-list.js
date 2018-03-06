import m from 'mithril';
import ListItemFolder from '../common/list-item-folder';
import ListItemOne from '../common/list-item-one';
import documents from '../../models/extract-in-bulk-for-docs/documents';
import labels from '../../labels';

class DocumentsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_26}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', this._makeTree())
        ])
      ])
    ]);
  }

  _makeTree() {
    let tree = [];
    let folders = documents.getFoldersTree();

    for (let folderIndex in folders) {
      let currentFolder = folders[folderIndex];
      let documents = currentFolder.documents;
      tree.push(m(ListItemFolder, {header: currentFolder.name}));

      for (let documentIndex in documents) {
        let currentDocument = documents[documentIndex];
        tree.push(m(ListItemOne, {
          bigHeader: currentDocument.name,
          smallHeader: currentDocument.id,
          checked: (currentDocument.flagOne) ? true : null
        }));
      }
    }
    return tree;
  }
}

export default DocumentsList;
