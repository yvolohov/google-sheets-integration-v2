import m from 'mithril';
import documentsMaker from '../../models/fill-in-bulk/documents-maker';
import documentLinks from '../../models/fill-in-bulk/document-links';

class FilledDocumentsList {
  view() {
    return m('div', {class: 'row'}, this._makeList());
  }

  _makeList() {
    let list = [];
    let documents = documentsMaker.getDocuments();

    for (let idx in documents) {
      let currentDocument = documents[idx];
      let properties = {
        href: '#',
        class: 'ml',
        onclick: this._linkClickHandler.bind(this, currentDocument.id)
      };

      list.push(m('div', {class: 'col-12-sm'}, [
        m('a', properties, currentDocument.id),
        m('div', {class: 'mgl'}, currentDocument.name)
      ]));
    }
    return list;
  }

  _linkClickHandler(documentId, event) {
    event.preventDefault();
    documentLinks.loadLink(documentId, 1, 30, (link) => {
      window.open(link.url);
    });
  }
}

export default FilledDocumentsList;
