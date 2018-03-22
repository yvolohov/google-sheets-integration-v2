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
        let checkboxHandler = this._checkboxHandler.bind(this, currentDocument.id, documents, documentsFields);

        tree.push(m(ListItemOne, {
          checkboxFlag: (currentDocument[flagName]) ? true : null,
          bigHeader: currentDocument.name,
          smallHeader: currentDocument.id,
          checkboxHandler: checkboxHandler
        }));
      }
    }
    return tree;
  }

  _checkboxHandler(documentId, documents, documentsFields, event) {
    let flag = event.target.checked;
    documents.selectDocument(documentId, flag);

    if (!documentsFields) {
      return;
    }

    /* Если поля загрузились успешно, то просто перерисовываем экран,
     * При ошибке вызываем колбек, который снимает выделение с документа
     * и перерисовываем экран */
    documentsFields.refreshFields(
      documentId,
      flag,
      this._afterRefreshing.bind(this),
      this._afterRefreshing.bind(
        this,
        documents.selectDocument.bind(documents, documentId, false)
      )
    );
  }

  _afterRefreshing(callback) {
    if (callback) {
      callback();
    }
    m.redraw();
  }
}

export default DocumentsList;
