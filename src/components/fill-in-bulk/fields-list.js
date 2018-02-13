import m from 'mithril';
import ListItemOne from '../common/list-item-one';
import documentFields from '../../models/fill-in-bulk/document-fields';
import labels from '../../labels';

const SCROLL_BOX_STYLES = `width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`;

class FieldsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'template-fields-div'}, `${labels.l_11}:`),
        m('div', {style: SCROLL_BOX_STYLES}, [
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

      list.push(m(ListItemOne, {
        bigHeader: currentField.name,
        smallHeader: `${labels.l_12}: ${currentField.type}`,
        clickHandler: this._clickHandler.bind(this, currentField.name),
        checked: (currentField.checkboxChecked) ? true : null
      }));
    }
    return list;
  }

  _clickHandler(fieldName, event) {
    event.redraw = false;
    documentFields.selectField(fieldName, event.target.checked);
  }
}

export default FieldsList;
