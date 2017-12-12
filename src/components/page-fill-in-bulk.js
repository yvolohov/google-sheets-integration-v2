import m from 'mithril';
import RowHeader from './row-header';
import labels from '../labels';

class PageFillInBulk {
  view() {
    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_1})
    ]);
  }
}

export default PageFillInBulk;
