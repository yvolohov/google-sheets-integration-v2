import m from 'mithril';
import BasePage from './base-page';

class CreatedDocuments extends BasePage {
  constructor() {
    super([]);
  }

  view() {
    return m('div', {class: 'container'}, [
      m('div', {class: 'row'}, [
        m('div', {class: 'col-12-sm', style: 'text-align: center;'}, [
          m('b', {class: 'bgl'}, 'CREATED DOCUMENTS')
        ])
      ])
    ]);
  }
}

export default CreatedDocuments;
