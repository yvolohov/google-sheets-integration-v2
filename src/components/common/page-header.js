import m from 'mithril';
import labels from '../../labels';

class PageHeader {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('b', m('a', {href: '#!/page-menu', target: '_self'}, labels.l_0)),
        m('b', {class: 'gray'}, ' > '),
        m('b', {class: 'gray'}, vnode.attrs.pageLabel)
      ])
    ]);
  }
}

export default PageHeader;
