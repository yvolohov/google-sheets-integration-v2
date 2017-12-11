import m from 'mithril';
import PageMenu from './page-menu';

class PageSet {
  view() {
    return m('div', {id: 'page-set'}, [
      m(PageMenu),
      m('div', {class: 'container'}, 'Container #2'),
      m('div', {class: 'container'}, 'Container #3'),
      m('div', {class: 'container'}, 'Container #4')
    ]);
  }
}

export default PageSet;
