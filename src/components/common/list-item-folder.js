import m from 'mithril';

class ListItemFolder {
  view(vnode) {
    let properties = {
      class: 'ml',
      style: 'font-weight: bold; margin-left: 5px; margin-top: 5px; margin-bottom: 5px; max-width: 200px;'
    };
    return m('div', properties, vnode.attrs.header);
  }
}

export default ListItemFolder;
