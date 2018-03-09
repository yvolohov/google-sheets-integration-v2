import m from 'mithril';

class ListItemFolder {
  view(vnode) {
    return m('div', {class: 'ml folder-box'}, vnode.attrs.header);
  }
}

export default ListItemFolder;
