import m from 'mithril';
import documentFields from '../../models/document-fields';
import labels from '../../labels';

class RowCreateDataHeader {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('input', this._setChecked({
          id: 'new-sheet-checkbox',
          type: 'checkbox',
          onclick: this._newSheetCheckboxClickHandler.bind(this)
        })),
        m('label', {for: 'new-sheet-checkbox', class: 'gray'}, labels.l_13)
      ]),
      m('div', {class: 'col-6-sm'}, [
        m('button', {
          style: 'width: 100%;',
          onclick: this._insertInRowButtonClickHandler.bind(this)
        }, labels.l_14)
      ]),
      m('div', {class: 'col-6-sm'}, [
        m('button', {
          style: 'width: 100%;',
          onclick: this._insertIoColumnButtonClickHandler.bind(this)
        }, labels.l_15)
      ])
    ]);
  }

  _setChecked(checkboxSettings) {
    if (documentFields.getNewSheetFlag()) {
      checkboxSettings['checked'] = 'checked';
    }
    return checkboxSettings;
  }

  _newSheetCheckboxClickHandler(event) {
    event.redraw = false;
    documentFields.setNewSheetFlag(event.target.checked);
  }

  _insertInRowButtonClickHandler(event) {
    event.redraw = false;
  }

  _insertIoColumnButtonClickHandler(event) {
    event.redraw = false;
  }
}

export default RowCreateDataHeader;
