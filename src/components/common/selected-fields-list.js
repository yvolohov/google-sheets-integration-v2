import m from 'mithril';
import ListItemThree from '../common/list-item-three';
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

    for (let idx in fields) {
      let currentField = fields[idx];
      let checkboxHandler = this._checkboxHandler.bind(this, idx, model);
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true, model) : null;
      let downArrowHandler = (idx < (fields.length - 1))
        ? this._arrowHandler.bind(this, idx, false, model) : null;

      list.push(m(ListItemThree, {
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

  _checkboxHandler(idx, model, event) {
    console.log(idx, event.target.value);
  }

  _arrowHandler(idx, up, model, event) {
    event.preventDefault();
    console.log(idx, up);
  }
}

export default SelectedFieldsList;
