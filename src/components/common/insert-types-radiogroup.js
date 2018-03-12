import m from 'mithril';
import labels from '../../labels';

const INSERT_IN_ROW_ON_CURRENT_SHEET = 0;
const INSERT_IN_COLUMN_ON_CURRENT_SHEET = 1;
const INSERT_IN_ROW_ON_NEW_SHEET = 2;
const INSERT_IN_COLUMN_ON_NEW_SHEET = 3;

class InsertTypesRadiogroup {
  view(vnode) {
    let currentValue = vnode.attrs.currentValue;
    let callback = vnode.attrs.callback;
    let simplifiedView = vnode.attrs.simplifiedView || false;
    let radioButtons = [
      this._makeRadioButton(INSERT_IN_ROW_ON_CURRENT_SHEET, callback, currentValue, labels.l_13),
      this._makeRadioButton(INSERT_IN_COLUMN_ON_CURRENT_SHEET, callback, currentValue, labels.l_14)
    ];

    if (!simplifiedView) {
      radioButtons.push(this._makeRadioButton(INSERT_IN_ROW_ON_NEW_SHEET, callback, currentValue, labels.l_15));
      radioButtons.push(this._makeRadioButton(INSERT_IN_COLUMN_ON_NEW_SHEET, callback, currentValue, labels.l_27));
    }
    return m('div', radioButtons);
  }

  _makeRadioButton(value, callback, currentValue, label) {
    let id = `rb-${value + 1}`;

    return m('div', [
      m('input', {
        id: id,
        type: 'radio',
        name: 'insert-types',
        value: value,
        onclick: callback,
        checked: (value === currentValue) ? true : null
      }),
      m('label', {class: 'mgl', for: id}, label)
    ]);
  }
}

export default InsertTypesRadiogroup;
