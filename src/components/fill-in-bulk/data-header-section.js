import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import labels from '../../labels';

class DataHeaderSection {
  view(vnode) {
    let model = vnode.attrs.model;
    let insertType = model.getInsertType();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'},
        m(InsertTypesRadiogroup, {
          currentValue: insertType,
          callback: this._radioClickHandler.bind(this, model),
          simplifiedView: false
        })
      ),
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
