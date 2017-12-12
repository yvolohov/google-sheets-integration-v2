import m from 'mithril';
import RowHeader from './row-header';
import labels from '../labels';

class PageGetFormFields {
  view() {
    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_3})
    ]);
  }
}

export default PageGetFormFields;
