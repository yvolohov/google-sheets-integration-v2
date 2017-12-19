import m from 'mithril';
import documents from '../models/documents';
import labels from '../labels';

class RowDocumentFolder {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'gray'}, labels.l_8 + ':'),
        m('div', {style: 'height: 25px;'}, this._prepareFolder())
      ])
    ]);
  }

  _prepareFolder() {
    let selectedDocument = documents.getSelectedDocument();
    return (selectedDocument !== null) ? selectedDocument.folder.name : '...';
  }
}

export default RowDocumentFolder;
