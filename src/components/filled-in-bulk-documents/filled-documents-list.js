import m from 'mithril';
import documentsMaker from '../../models/fill-in-bulk/documents-maker';

class FilledDocumentsList {
  view() {
    return m('div', {class: 'col-12-sm'}, [
      m('div', 'content')
    ]);
  }
}

export default FilledDocumentsList;
