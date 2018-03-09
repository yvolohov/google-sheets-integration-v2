import m from 'mithril';

class ListItemOne {
  view(vnode) {
    let checkboxSettings = {
      type: 'checkbox',
      onclick: vnode.attrs.clickHandler,
      checked: vnode.attrs.checked
    };

    return m('div', [
      m('div', {class: 'flag-box'}, [
        m('input', checkboxSettings)
      ]),
      m('div', {class: 'list-column', style: 'max-width: 200px;'}, [
        m('div', {class: 'ml'}, vnode.attrs.bigHeader),
        m('div', {class: 'sgl'}, vnode.attrs.smallHeader)
      ])
    ]);
  }
}

export default ListItemOne;
