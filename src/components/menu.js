import m from 'mithril';
import documentsMaker from '../models/fill-in-bulk/documents-maker';
import labels from '../labels';

class Menu {
  view() {
    let createdDocuments = documentsMaker.getDocuments();
    let links = [];
    links.push(this._insertLink(labels.l_1, '#!/fill-in-bulk'));

    if (createdDocuments.length > 0) {
      links.push(this._insertLink(labels.l_39, '#!/created-documents'));
    }
    
    links.push(this._insertLink(labels.l_2, '#!/extract-in-bulk-for-docs'));
    links.push(this._insertLink(labels.l_3, '#!/extract-in-bulk-for-forms'));
    links.push(this._insertLink(labels.l_4, '#!/get-editor-access-links'));
    return m('div', {class: 'container'}, links);
  }

  _insertLink(text, url) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('b', m('a', {href: url, target: '_self'}, text))
      ])
    ]);
  }
}

export default Menu;
