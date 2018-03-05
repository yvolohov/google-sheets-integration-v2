import m from 'mithril';
import labels from '../../labels';

const INSERT_IN_ROW_ON_CURRENT_SHEET = 0;
const INSERT_IN_COLUMN_ON_CURRENT_SHEET = 1;
const INSERT_IN_ROW_ON_NEW_SHEET = 2;
const INSERT_IN_COLUMN_ON_NEW_SHEET = 3;

class DataHeaderSection {
  view(vnode) {
    let model = vnode.attrs.model;
    let insertType = model.getInsertType();
    let checkedOne = (insertType === INSERT_IN_ROW_ON_CURRENT_SHEET) ? true : null;
    let checkedTwo = (insertType === INSERT_IN_COLUMN_ON_CURRENT_SHEET) ? true : null;
    let checkedThree = (insertType === INSERT_IN_ROW_ON_NEW_SHEET) ? true : null;
    let checkedFour = (insertType === INSERT_IN_COLUMN_ON_NEW_SHEET) ? true : null;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', [
          m('input', {
            id: 'rb-1',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_ROW_ON_CURRENT_SHEET,
            onclick: this._radioClickHandler.bind(this, model),
            checked: checkedOne
          }),
          m('label', {class: 'mgl', for: 'rb-1'}, labels.l_13)
        ]),
        m('div', [
          m('input', {
            id: 'rb-2',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_COLUMN_ON_CURRENT_SHEET,
            onclick: this._radioClickHandler.bind(this, model),
            checked: checkedTwo
          }),
          m('label', {class: 'mgl', for: 'rb-2'}, labels.l_14)
        ]),
        m('div', [
          m('input', {
            id: 'rb-3',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_ROW_ON_NEW_SHEET,
            onclick: this._radioClickHandler.bind(this, model),
            checked: checkedThree
          }),
          m('label', {class: 'mgl', for: 'rb-3'}, labels.l_15)
        ]),
        m('div', [
          m('input', {
            id: 'rb-4',
            type: 'radio',
            name: 'insert-types',
            value: INSERT_IN_COLUMN_ON_NEW_SHEET,
            onclick: this._radioClickHandler.bind(this, model),
            checked: checkedFour
          }),
          m('label', {class: 'mgl', for: 'rb-4'}, labels.l_27)
        ])
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          style: 'width: 100%;',
          onclick: this._buttonClickHandler.bind(this, model)
        }, labels.l_28)
      ])
    ]);
  }

  _buttonClickHandler(model, event) {
    event.redraw = false;
    model.createDataHeader();
  }

  _radioClickHandler(model, event) {
    event.redraw = false;
    model.setInsertType(event.target.value);
  }
}

export default DataHeaderSection;
