import m from 'mithril';

class ListItemTwo {
  view(vnode) {
    let upArrow = String.fromCharCode(0x02C4);
    let downArrow = String.fromCharCode(0x02C5);
    let bigHeader = vnode.attrs.bigHeader;
    let smallHeader = vnode.attrs.smallHeader;
    let upArrowHandler = vnode.attrs.upArrowHandler;
    let downArrowHandler = vnode.attrs.downArrowHandler;

    return m('div', [
      m('div', {class: 'list-column'}, [
        m('div', {class: 'arrow-box'}, this._makeLink(upArrow, upArrowHandler)),
        m('div', {class: 'arrow-box'}, this._makeLink(downArrow, downArrowHandler))
      ]),
      m('div', {class: 'list-column', style: 'max-width: 200px;'}, [
        m('div', {class: 'ml'}, bigHeader),
        m('div', {class: 'sgl'}, smallHeader)
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
