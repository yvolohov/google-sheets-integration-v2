import m from 'mithril';

class ListItemFolder {
  view(vnode) {
    let properties = {
      class: 'ml',
      style: 'font-weight: bold;'
    };
    return m('div', properties, vnode.attrs.header);
  }
}

export default ListItemFolder;
