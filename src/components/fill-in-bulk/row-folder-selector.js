import m from 'mithril';
import BaseSelector from '../common/base-selector';
import folders from '../../models/folders';
import labels from '../../labels';

class RowFolderSelector extends BaseSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'folder-select'}, `${labels.l_9}:`),
        m('select', {
          id: 'folder-select',
          style: 'width: 100%; text-align: left;',
          onchange: this._changeHandler.bind(this)
        },
        this._makeList())
      ]),
      m('div', this._setVisibility({class: 'col-12-sm'}), [
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

  _makeList() {
    let selectedFolderId = folders.getSelectedFolderId();
    let settings = this._makeOptionSettings(0, selectedFolderId);
    let list = [m('option', settings, labels.l_10)];
    let foldersData = folders.getFoldersList();

    for (let folderIndex in foldersData) {
      let currentFolder = foldersData[folderIndex];
      let settings = this._makeOptionSettings(currentFolder.folder_id, selectedFolderId);
      list.push(m('option', settings, currentFolder.name));
    }

    settings = this._makeOptionSettings(1, selectedFolderId);
    list.push(m('option', settings, `--- ${labels.l_20} ---`));
    return list;
  }

  _setVisibility(cellSettings) {
    if (folders.getSelectedFolderId() !== 1) {
      cellSettings['style'] = 'display: none;';
    }
    return cellSettings;
  }

  _changeHandler(event) {
    folders.setSelectedFolderId(event.target.value);
  }
}

export default RowFolderSelector;
