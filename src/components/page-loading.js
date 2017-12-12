import m from 'mithril';
import labels from '../labels';

class PageLoading {
  view() {
    return m('div', {class: 'container'}, [
      m('div', {class: 'row'}, [
        m('div', {class: 'col-12-sm', style: 'text-align: center;'}, [
          m('b', {class: 'gray'}, labels.l_6)
        ])
      ])
    ]);
  }
}

export default PageLoading;
