import m from 'mithril';
import ListItem from '../common/list-item';
import documentsFields from '../../models/extract-in-bulk-for-docs/documents-fields';
import labels from '../../labels';

class SelectedFieldsList {
  view(vnode) {
    let content = (!documentsFields.isLoading())
      ? this._makeList()
      : this._makeLoader();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_33}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', content)
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let fields = documentsFields.getFields();

    for (var idx = 0; idx < fields.length; idx++) {
      let currentField = fields[idx];
      let checkboxHandler = this._checkboxHandler.bind(this, currentField.name, currentField.service);
      let smallHeader = `${labels.l_34}: ${currentField.count}`;
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true) : null;
      let downArrowHandler = (idx < (fields.length - 1))
        ? this._arrowHandler.bind(this, idx, false) : null;

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: true,
        checkboxFlag: currentField['flag'] ? true : null,
        bigHeader: currentField.name,
        smallHeader: smallHeader,
        checkboxHandler: checkboxHandler,
        upArrowHandler: upArrowHandler,
        downArrowHandler: downArrowHandler
      }));
    }
    return list;
  }

  _makeLoader() {
    return m('div', {
      class: 'mgl',
      style: 'text-align: center; margin-top: 5px;'
    }, labels.l_6);
  }

  _checkboxHandler(fieldName, isService, event) {
    event.redraw = false;
    documentsFields.selectField(fieldName, isService, event.target.checked);
  }

  _arrowHandler(idx, up, event) {
    event.preventDefault();
    documentsFields.moveField(idx, up);
  }
}

export default SelectedFieldsList;
