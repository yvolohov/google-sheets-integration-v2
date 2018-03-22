import m from 'mithril';
import ListItem from '../common/list-item';
import labels from '../../labels';

class SelectedFieldsList {
  view(vnode) {
    let model = vnode.attrs.model;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_33}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', this._makeList(model))
        ])
      ])
    ]);
  }

  _makeList(model) {
    let list = [];
    let fields = model.getFields();

    for (var idx = 0; idx < fields.length; idx++) {
      let currentField = fields[idx];
      let checkboxHandler = this._checkboxHandler.bind(this, currentField.name, model);
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true, model) : null;
      let downArrowHandler = (idx < (fields.length - 1))
        ? this._arrowHandler.bind(this, idx, false, model) : null;

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: true,
        checkboxFlag: currentField['flag'] ? true : null,
        bigHeader: currentField.name,
        smallHeader: currentField.count,
        checkboxHandler: checkboxHandler,
        upArrowHandler: upArrowHandler,
        downArrowHandler: downArrowHandler
      }));
    }
    return list;
  }

  _checkboxHandler(fieldName, model, event) {
    event.redraw = false;
    model.selectField(fieldName, event.target.checked);
  }

  _arrowHandler(idx, up, model, event) {
    event.preventDefault();
    model.moveField(idx, up);
  }
}

export default SelectedFieldsList;
