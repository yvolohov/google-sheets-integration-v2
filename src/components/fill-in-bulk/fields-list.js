import m from 'mithril';
import ListItem from '../common/list-item';
import documentFields from '../../models/fill-in-bulk/document-fields';
import labels from '../../labels';

class FieldsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_11}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', this._makeList())
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let selectedDocumentFields = documentFields.getDocumentFields();

    for (let fieldIndex in selectedDocumentFields) {
      let currentField = selectedDocumentFields[fieldIndex];
      let checkboxHandler = this._checkboxHandler.bind(this, currentField.name);

      list.push(m(ListItem, {
        showArrows: false,
        showCheckbox: true,
        bigHeader: currentField.name,
        smallHeader: `${labels.l_12}: ${currentField.type}`,
        checkboxFlag: (currentField.flag) ? true : null,
        checkboxHandler: checkboxHandler
      }));
    }
    return list;
  }

  _checkboxHandler(fieldName, event) {
    event.redraw = false;
    documentFields.selectDocumentField(fieldName, event.target.checked);
  }
}

export default FieldsList;
