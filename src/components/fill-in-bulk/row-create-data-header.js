import m from 'mithril';
import dataHeader from '../../models/data-header';
import labels from '../../labels';

const INSERT_IN_ROW_ON_CURRENT_SHEET = 0;
const INSERT_IN_COLUMN_ON_CURRENT_SHEET = 1;
const INSERT_IN_ROW_ON_NEW_SHEET = 2;
const INSERT_IN_COLUMN_ON_NEW_SHEET = 3;

class RowCreateDataHeader {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('input', this._setChecked({
          id: 'new-sheet-checkbox',
          type: 'checkbox',
          onclick: this._checkboxClickHandler.bind(this)
        })),
        m('label', {for: 'new-sheet-checkbox', class: 'gray'}, labels.l_13)
      ]),
      m('div', {class: 'col-6-sm'}, [
        m('button', {
          style: 'width: 100%;',
          onclick: this._rowButtonClickHandler.bind(this)
        }, labels.l_14)
      ]),
      m('div', {class: 'col-6-sm'}, [
        m('button', {
          style: 'width: 100%;',
          onclick: this._columnButtonClickHandler.bind(this)
        }, labels.l_15)
      ])
    ]);
  }

  _setChecked(checkboxSettings) {
    if (dataHeader.getNewSheetFlag()) {
      checkboxSettings['checked'] = 'checked';
    }
    return checkboxSettings;
  }

  _checkboxClickHandler(event) {
    event.redraw = false;
    dataHeader.setNewSheetFlag(event.target.checked);
  }

  _rowButtonClickHandler(event) {
    event.redraw = false;

    if (dataHeader.getNewSheetFlag()) {
      dataHeader.createDataHeader(INSERT_IN_ROW_ON_NEW_SHEET);
    }
    else {
      dataHeader.createDataHeader(INSERT_IN_ROW_ON_CURRENT_SHEET);
    }
  }

  _columnButtonClickHandler(event) {
    event.redraw = false;

    if (dataHeader.getNewSheetFlag()) {
      dataHeader.createDataHeader(INSERT_IN_COLUMN_ON_NEW_SHEET);
    }
    else {
      dataHeader.createDataHeader(INSERT_IN_COLUMN_ON_CURRENT_SHEET);
    }
  }
}

export default RowCreateDataHeader;
