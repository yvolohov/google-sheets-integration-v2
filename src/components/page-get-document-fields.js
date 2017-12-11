import m from 'mithril';
import ButtonToMenu from './button-to-menu';

class PageGetDocumentFields {
  view() {
    return m('div', {class: 'container'}, [
      m(ButtonToMenu),
      'get-document-fields'
    ]);
  }
}

export default PageGetDocumentFields;
