import m from 'mithril';
import folders from '../models/folders';
import labels from '../labels';

class RowFolderSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'folder-select'}, labels.l_9 + ':'),
        m('select', {
          id: 'folder-select',
          style: 'width: 100%; text-align: left;',
          onchange: this._changeHandler.bind(this)
        },
        this._makeList())
      ])
    ]);
  }

  _changeHandler(event) {
    folders.setSelectedFolder(event.target.value);
  }

  _makeList() {
    return [];
  }
}

export default RowFolderSelector;
