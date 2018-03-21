import m from 'mithril';
import labels from '../../labels';

class ListItemThree {
  view(vnode) {
    let checkboxSettings = {
      type: 'checkbox'
    };

    let arrowUp = String.fromCharCode(0x02C4);
    let arrowDown = String.fromCharCode(0x02C5);
    let upCallback = vnode.attrs.upCallback;
    let downCallback = vnode.attrs.downCallback;

    return m('div', [
      m('div', {class: 'list-column'}, [
        m('div', {class: 'arrow-box'}, this._makeLink(arrowUp, upCallback)),
        m('div', {class: 'arrow-box'}, this._makeLink(arrowDown, downCallback))
      ]),
      m('div', {class: 'flag-box'}, [
        m('input', checkboxSettings)
      ]),
      m('div', {class: 'list-column', style: 'max-width: 170px;'}, [
        m('div', {class: 'ml'}, vnode.attrs.bigHeader),
        m('div', {class: 'sgl'}, `${labels.l_34}: ${vnode.attrs.smallHeader}`)
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

export default ListItemThree;
