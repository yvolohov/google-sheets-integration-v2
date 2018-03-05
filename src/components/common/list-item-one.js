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
      m('div', {style: 'display: inline-block; max-width: 200px;'}, [
        m('div', {class: 'ml'}, vnode.attrs.bigHeader),
        m('div', {class: 'sgl'}, vnode.attrs.smallHeader)
      ])
    ]);
  }
}

export default ListItemOne;
