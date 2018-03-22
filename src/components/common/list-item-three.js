import m from 'mithril';
import labels from '../../labels';

class ListItemThree {
  view(vnode) {
    let upArrow = String.fromCharCode(0x02C4);
    let downArrow = String.fromCharCode(0x02C5);
    let checkboxFlag = vnode.attrs.checkboxFlag;
    let bigHeader = vnode.attrs.bigHeader;
    let smallHeader = vnode.attrs.smallHeader;
    let checkboxHandler = vnode.attrs.checkboxHandler;
    let upArrowHandler = vnode.attrs.upArrowHandler;
    let downArrowHandler = vnode.attrs.downArrowHandler;

    let checkboxSettings = {
      type: 'checkbox',
      checked: checkboxFlag,
      onclick: checkboxHandler
    };

    return m('div', [
      m('div', {class: 'list-column'}, [
        m('div', {class: 'arrow-box'}, this._makeLink(upArrow, upArrowHandler)),
        m('div', {class: 'arrow-box'}, this._makeLink(downArrow, downArrowHandler))
      ]),
      m('div', {class: 'flag-box'}, [
        m('input', checkboxSettings)
      ]),
      m('div', {class: 'list-column', style: 'max-width: 170px;'}, [
        m('div', {class: 'ml'}, bigHeader),
        m('div', {class: 'sgl'}, `${labels.l_34}: ${smallHeader}`)
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
