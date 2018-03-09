import m from 'mithril';

class ListItemTwo {
  view(vnode) {
    let arrowUp = String.fromCharCode(0x02C4);
    let arrowDown = String.fromCharCode(0x02C5);
    let upCallback = vnode.attrs.upCallback;
    let downCallback = vnode.attrs.downCallback;

    return m('div', [
      m('div', {class: 'list-column'}, [
        m('div', {class: 'arrow-box'}, this._makeLink(arrowUp, upCallback)),
        m('div', {class: 'arrow-box'}, this._makeLink(arrowDown, downCallback))
      ]),
      m('div', {class: 'list-column', style: 'max-width: 200px;'}, [
        m('div', {class: 'ml'}, vnode.attrs.bigHeader),
        m('div', {class: 'sgl'}, vnode.attrs.smallHeader)
      ])
    ]);
  }

  _makeLink(arrow, callback) {
    if (!callback) {
      return m('span', {class: 'bgl'}, arrow);
    }
    return m('a', {href: '#', class: 'bl', onclick: callback}, arrow);
  }
}

export default ListItemTwo;
