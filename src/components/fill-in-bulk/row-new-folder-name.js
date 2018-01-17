import m from 'mithril';
import folders from '../../models/folders';
import labels from '../../labels';

class RowNewFolderName {
  view(vnode) {
    return m('div', this._setVisibility({class: 'row'}), [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'folder-name-input'}, `${labels.l_18}:`),
        m('input', {
          id: 'folder-name-input',
          type: 'text',
          placeholder: labels.l_19,
          style: 'width: 100%;'
        })
      ])
    ]);
  }

  _setVisibility(rowSettings) {
    if (folders.getSelectedFolderId() !== 1) {
      rowSettings['style'] = 'display: none;';
    }
    return rowSettings;
  }
}

export default RowNewFolderName;
