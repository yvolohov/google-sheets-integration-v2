import m from 'mithril';

class ListItemOne {
  view(vnode) {
    let checkboxSettings = {
      type: 'checkbox',
      onclick: vnode.attrs.clickHandler,
      checked: vnode.attrs.checked
    };

    return m('div', [
      m('div', {class: 'check-box'}, [
        m('input', checkboxSettings)
      ]),
      m('div', {style: 'display: inline-block;'}, [
        m('div', vnode.attrs.bigHeader),
        m('div', {class: 'secondary'}, vnode.attrs.smallHeader)
      ])
    ]);
  }
}

export default ListItemOne;
