import m from 'mithril';
import ListItemFolder from '../common/list-item-folder';
import ListItemOne from '../common/list-item-one';
import labels from '../../labels';

class DocumentsList {
  view(vnode) {
    let model = vnode.attrs.model;
    let flagName = vnode.attrs.flagName;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_26}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', this._makeTree(model, flagName))
        ])
      ])
    ]);
  }

  _makeTree(model, flagName) {
    let tree = [];
    let folders = model.getFoldersTree();

    for (let folderIndex in folders) {
      let currentFolder = folders[folderIndex];
      let documents = currentFolder.documents;
      tree.push(m(ListItemFolder, {header: currentFolder.name}));

      for (let documentIndex in documents) {
        let currentDocument = documents[documentIndex];

        tree.push(m(ListItemOne, {
          bigHeader: currentDocument.name,
          smallHeader: currentDocument.id,
          clickHandler: this._clickHandler.bind(this, currentDocument.id, model),
          checked: (currentDocument[flagName]) ? true : null
        }));
      }
    }
    return tree;
  }

  _clickHandler(documentId, model, event) {
    model.selectDocument(documentId, event.target.checked);
  }
}

export default DocumentsList;
