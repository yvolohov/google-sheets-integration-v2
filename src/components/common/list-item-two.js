import m from 'mithril';

class ListItemTwo {
  view(vnode) {
    return m('div', [
      m('div', {style: 'display: inline-block; max-width: 200px;'}, [
        m('div', {class: 'ml'}, vnode.attrs.bigHeader),
        m('div', {class: 'sgl'}, vnode.attrs.smallHeader)
      ])
    ]);
  }
}

export default ListItemTwo;
