import m from 'mithril';
import ButtonToMenu from './button-to-menu';

class PageGetFormFields {
  view() {
    return m('div', {class: 'container'}, [
      m(ButtonToMenu),      
      'get-form-fields'
    ]);
  }
}

export default PageGetFormFields;
