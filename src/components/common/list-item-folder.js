import m from 'mithril';

class ListItemFolder {
  view(vnode) {
    let properties = {
      class: 'ml list-item-folder',
      style: 'font-weight: bold;'
    };
    return m('div', properties, vnode.attrs.header);
  }
}

export default ListItemFolder;
