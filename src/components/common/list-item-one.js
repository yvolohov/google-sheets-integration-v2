import m from 'mithril';

const CHECK_BOX_STYLES = `display: inline-block; width: 30px; vertical-align: top; text-align: center;`;

class ListItemOne {
  view(vnode) {
    let checkboxSettings = {
      type: 'checkbox',
      onclick: vnode.attrs.clickHandler,
      checked: vnode.attrs.checked
    };

    return m('div', [
      m('div', {style: CHECK_BOX_STYLES}, [
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
