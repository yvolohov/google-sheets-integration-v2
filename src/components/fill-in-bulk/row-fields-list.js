import m from 'mithril';
import documentFields from '../../models/document-fields';
import labels from '../../labels';

const SCROLL_BOX_STYLES = `width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`;
const RADIO_BUTTON_STYLES = `display: inline-block; width: 30px; vertical-align: top; text-align: center;`;

class RowFieldsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'template-fields-div'}, `${labels.l_11}:`),
        m('div', {style: SCROLL_BOX_STYLES}, [
          m('div', this._makeList())
        ])
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('input', {id: 'new-sheet-checkbox', type: 'checkbox'}),
        m('label', {for: 'new-sheet-checkbox', class: 'gray'}, labels.l_13)
      ]),
      m('div', {class: 'col-6-sm'}, [
        m('button', {style: 'width: 100%;'}, labels.l_14)
      ]),
      m('div', {class: 'col-6-sm'}, [
        m('button', {style: 'width: 100%;'}, labels.l_15)
      ]),
    ]);
  }

  _makeList() {
    let list = [];
    let selectedDocumentFields = documentFields.getDocumentFields();

    for (let fieldIndex in selectedDocumentFields) {
      let currentField = selectedDocumentFields[fieldIndex];
      let checkboxSettings = {
        type: 'checkbox',
        onclick: this._clickHandler.bind(this, currentField.name),
        checked: (currentField.checkboxChecked) ? true : null
      };

      list.push(
        m('div', [
          m('div', {style: RADIO_BUTTON_STYLES}, [
            m('input', checkboxSettings)
          ]),
          m('div', {style: 'display: inline-block;'}, [
            m('div', currentField.name),
            m('div', {class: 'secondary'}, `${labels.l_12}: ${currentField.type}`)
          ])
        ])
      );
    }
    return list;
  }

  _clickHandler(fieldName, event) {
    event.redraw = false;
    documentFields.selectField(fieldName, event.target.checked);
  }
}

export default RowFieldsList;
