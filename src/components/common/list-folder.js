import m from 'mithril';

class ListFolder {
  view(vnode) {
    return m('div', {class: 'ml folder-box'}, vnode.attrs.header);
  }
}

export default ListFolder;
