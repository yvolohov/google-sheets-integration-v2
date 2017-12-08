import m from 'mithril';

class PageSet {
  view() {
    return m('div', {id: 'page-set'}, [
      m('div', {class: 'container'}, 'Container #1'),
      m('div', {class: 'container'}, 'Container #2'),
      m('div', {class: 'container'}, 'Container #3'),
      m('div', {class: 'container'}, 'Container #4')
    ]);
  }
}

export default PageSet;
