import m from 'mithril';
import fillRequestForms from '../../models/fill-request-forms';
import labels from '../../labels';

const SCROLL_BOX_STYLES = `width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`;
const CHECK_BOX_STYLES = `display: inline-block; width: 30px; vertical-align: top; text-align: center;`;

class RowFilledFormsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'template-fields-div'}, `${labels.l_23}:`),
        m('div', {style: SCROLL_BOX_STYLES}, [
          m('div', this._makeList())
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let selectedFillRequestForms = fillRequestForms.getSelectedFillRequestForms();

    for (let formIdx in selectedFillRequestForms) {
      let currentForm = selectedFillRequestForms[formIdx];
      let checkboxSettings = {
        type: 'checkbox'
      };

      list.push(
        m('div', [
          m('div', {style: CHECK_BOX_STYLES}, [
            m('input', checkboxSettings)
          ]),
          m('div', {style: 'display: inline-block;'}, [
            m('div', `${labels.l_16} #${currentForm.filled_form_id}`),
            m('div', {class: 'secondary'}, 'Small Header')
          ])
        ])
      );
    }
    return list;
  }
}

export default RowFilledFormsList;
