import m from 'mithril';
import BaseSelector from '../common/base-selector';
import folders from '../../models/fill-in-bulk/folders';
import labels from '../../labels';

const USE_EXISTING_FOLDER = 0;
const CREATE_NEW_FOLDER = 1;

class FolderSelector extends BaseSelector {
  view(vnode) {
    let callback = this._radioClickHandler.bind(this);
    let currentValue = folders.getFolderAction();

    let radioButtons = [
      this._makeRadioButton(USE_EXISTING_FOLDER, callback, currentValue, labels.l_18),
      this._makeRadioButton(CREATE_NEW_FOLDER, callback, currentValue, labels.l_20)
    ];

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_9}:`),
        m('div', radioButtons)
      ])
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

  /*
  view(vnode) {
    let selectSettings = {
      style: 'width: 100%; text-align: left;',
      onchange: this._changeHandler.bind(this)
    };

    let inputSettings = {
      type: 'text',
      placeholder: labels.l_19,
      disabled: (folders.getSelectedFolderId() !== 1) ? true : null,
      style: 'width: 100%;'
    };

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_9}:`),
        m('select', selectSettings, this._makeList())
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'mgl'}, `${labels.l_18}:`),
        m('input', inputSettings)
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

  _changeHandler(event) {
    folders.setSelectedFolderId(event.target.value);
  }
  */
}

export default FolderSelector;
