import m from 'mithril';
import RowHeader from './common/row-header';
import labels from '../labels';

class PageGetEditorAccessLink {
  view() {
    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_4})
    ]);
  }
}

export default PageGetEditorAccessLink;
