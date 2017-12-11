import m from 'mithril';
import ButtonToMenu from './button-to-menu';

class PageGetEditorAccessLink {
  view() {
    return m('div', {class: 'container'}, [
      m(ButtonToMenu),      
      'get-editor-access-link'
    ]);
  }
}

export default PageGetEditorAccessLink;
