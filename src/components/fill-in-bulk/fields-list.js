import m from 'mithril';
import ListItem from '../common/list-item';
import documentFields from '../../models/fill-in-bulk/document-fields';
import labels from '../../labels';

class FieldsList {
  view(vnode) {
    let content = (!documentFields.isLoading())
      ? this._makeList()
      : this._makeLoader();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_11}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', content)
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let fields = documentFields.getFields();

    for (var idx = 0; idx < fields.length; idx++) {
      let currentField = fields[idx];
      let checkboxHandler = this._checkboxHandler.bind(this, currentField.name);
      let smallHeader = `${labels.l_12}: ${currentField.type}`;
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true) : null;
      let downArrowHandler = (idx < (fields.length - 1))
        ? this._arrowHandler.bind(this, idx, false) : null;

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: true,
        checkboxFlag: (currentField.flag) ? true : null,
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

  _checkboxHandler(fieldName, event) {
    event.redraw = false;
    documentFields.selectField(fieldName, event.target.checked);
  }

  _arrowHandler(idx, up, event) {
    event.preventDefault();
    documentFields.moveField(idx, up);
  }
}

export default FieldsList;
