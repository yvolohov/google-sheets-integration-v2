import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import dataHeader from '../../models/fill-in-bulk/data-header';
import labels from '../../labels';

class DataHeaderSection {
  view(vnode) {
    let insertType = dataHeader.getInsertType();
    let isButtonDisabled = dataHeader.isButtonDisabled();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'},
        m(InsertTypesRadiogroup, {
          currentValue: insertType,
          callback: this._radioClickHandler.bind(this),
          simplifiedView: false
        })
      ),
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          style: 'width: 100%;',
          disabled: isButtonDisabled,
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_28)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    event.redraw = false;
    dataHeader.createDataHeader();
  }

  _radioClickHandler(event) {
    event.redraw = false;
    dataHeader.setInsertType(event.target.value);
  }
}

export default DataHeaderSection;
