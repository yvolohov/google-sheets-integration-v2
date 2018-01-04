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
      ])
    ]);
  }

  _changeHandler(event) {
    folders.setSelectedFolder(event.target.value);
  }

  _makeList() {
    let selectedFolder = folders.getSelectedFolder();
    let selectedFolderId = (selectedFolder !== null) ? selectedFolder.folder_id : 0;

    let settings = this._makeOptionSettings(0, selectedFolderId);
    let list = [m('option', settings, labels.l_10)];
    let foldersData = folders.getFoldersList();

    for (let folderIndex in foldersData) {
      let currentFolder = foldersData[folderIndex];
      let settings = this._makeOptionSettings(currentFolder.folder_id, selectedFolderId);
      list.push(m('option', settings, currentFolder.name));
    }
    return list;
  }
}

export default RowFolderSelector;
