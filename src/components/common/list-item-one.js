import m from 'mithril';

class ListItemOne {
  view(vnode) {
    let checkboxFlag = vnode.attrs.checkboxFlag;
    let bigHeader = vnode.attrs.bigHeader;
    let smallHeader = vnode.attrs.smallHeader;
    let checkboxHandler = vnode.attrs.checkboxHandler;

    let checkboxSettings = {
      type: 'checkbox',
      checked: checkboxFlag,
      onclick: checkboxHandler
    };

    return m('div', [
      m('div', {class: 'flag-box'}, [
        m('input', checkboxSettings)
      ]),
      m('div', {class: 'list-column', style: 'max-width: 200px;'}, [
        m('div', {class: 'ml'}, bigHeader),
        m('div', {class: 'sgl'}, smallHeader)
      ])
    ]);
  }
}

export default ListItemOne;
