import m from 'mithril';

class ListItemTwo {
  view(vnode) {
    let arrowUp = String.fromCharCode(0x02C4);
    let arrowDown = String.fromCharCode(0x02C5);

    return m('div', [
      m('div', {class: 'list-column'}, [
        m('div', {class: 'bl arrow-box'}, [
          m('a', arrowUp)
        ]),
        m('div', {class: 'bl arrow-box'}, [
          m('a', arrowDown)
        ])
      ]),
      m('div', {class: 'list-column', style: 'max-width: 200px;'}, [
        m('div', {class: 'ml'}, vnode.attrs.bigHeader),
        m('div', {class: 'sgl'}, vnode.attrs.smallHeader)
      ])
    ]);
  }
}

export default ListItemTwo;
