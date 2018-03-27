import m from 'mithril';
import folders from '../../models/fill-in-bulk/folders';
import labels from '../../labels';
import { USE_EXISTING_FOLDER, CREATE_NEW_FOLDER } from '../../models/fill-in-bulk/folders';

class FolderSelector {
  view(vnode) {
    let callback = this._radioClickHandler.bind(this);
    let currentValue = folders.getFolderAction();

    let radioButtons = [
      this._makeRadioButton(USE_EXISTING_FOLDER, callback, currentValue, labels.l_18),
      this._makeRadioButton(CREATE_NEW_FOLDER, callback, currentValue, labels.l_20)
    ];

    let component = (currentValue === USE_EXISTING_FOLDER)
      ? this._makeFolderSelect() : this._makeFolderInput();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_9}:`),
        m('div', radioButtons)
      ]),
      component
    ]);
  }

  _makeFolderSelect() {
    let foldersList = this._makeFoldersList();

    return m('div', {class: 'col-12-sm'}, [
      m('label', {class: 'mgl'}, `${labels.l_37}:`),
      m('select', {
        style: 'width: 100%; text-align: left;',
        onchange: this._selectChangeHandler.bind(this)
      }, foldersList)
    ]);
  }

  _makeFoldersList() {
    let selectedFolderId = folders.getSelectedFolderId();
    let selectionState = folders.getSelectionState(0);
    let foldersData = folders.getFoldersList();
    let list = [m('option', {value: 0, selected: selectionState}, labels.l_10)];

    for (let idx in foldersData) {
      let currentFolder = foldersData[idx];
      let selectionState = folders.getSelectionState(currentFolder.folder_id);

      list.push(m('option', {
        value: currentFolder.folder_id,
        selected: selectionState
      }, currentFolder.name));
    }
    return list;
  }

  _makeFolderInput() {
    return m('div', {class: 'col-12-sm'}, [
      m('label', {class: 'mgl'}, `${labels.l_36}:`),
      m('input', {
        type: 'text',
        placeholder: labels.l_19,
        style: 'width: 100%;'
      })
    ]);
  }

  _makeRadioButton(value, callback, currentValue, label) {
    let id = `rb-${value + 1}`;

    return m('div', [
      m('input', {
        id: id,
        type: 'radio',
        name: 'folder-actions',
        value: value,
        onclick: callback,
        checked: (value === currentValue) ? true : null
      }),
      m('label', {class: 'mgl', for: id}, label)
    ]);
  }

  _radioClickHandler(event) {
    folders.setFolderAction(event.target.value);
  }

  _selectChangeHandler(event) {
    event.redraw = false;
    folders.setSelectedFolderId(event.target.value);
  }
}

export default FolderSelector;
