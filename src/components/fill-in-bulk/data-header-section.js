import m from 'mithril';
import dataHeader from '../../models/fill-in-bulk/data-header';
import labels from '../../labels';

const INSERT_IN_ROW_ON_CURRENT_SHEET = 0;
const INSERT_IN_COLUMN_ON_CURRENT_SHEET = 1;
const INSERT_IN_ROW_ON_NEW_SHEET = 2;
const INSERT_IN_COLUMN_ON_NEW_SHEET = 3;

class DataHeaderSection {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', [
          m('input', {
            id: 'rb-1',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_ROW_ON_CURRENT_SHEET
          }),
          m('label', {class: 'mgl', for: 'rb-1'}, labels.l_13)
        ]),
        m('div', [
          m('input', {
            id: 'rb-2',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_COLUMN_ON_CURRENT_SHEET
          }),
          m('label', {class: 'mgl', for: 'rb-2'}, labels.l_14)
        ]),
        m('div', [
          m('input', {
            id: 'rb-3',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_ROW_ON_NEW_SHEET
          }),
          m('label', {class: 'mgl', for: 'rb-3'}, labels.l_15)
        ]),
        m('div', [
          m('input', {
            id: 'rb-4',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_COLUMN_ON_NEW_SHEET
          }),
          m('label', {class: 'mgl', for: 'rb-4'}, labels.l_27)
        ])
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          style: 'width: 100%;',
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_28)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    event.redraw = false;
    dataHeader.createDataHeader(INSERT_IN_ROW_ON_CURRENT_SHEET);
  }
}

export default DataHeaderSection;
