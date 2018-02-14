import m from 'mithril';
import ListItemOne from '../common/list-item-one';
import fillRequestForms from '../../models/extract-in-bulk-for-forms/fill-request-forms';
import labels from '../../labels';

const SCROLL_BOX_STYLES = `width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`;

class FilledFormsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray'}, `${labels.l_23}:`),
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

      list.push(m(ListItemOne, {
        bigHeader: `${labels.l_16}: #${currentForm.filled_form_id}`,
        smallHeader: this._createSmallHeader(currentForm),
        clickHandler: this._clickHandler.bind(this, currentForm.filled_form_id),
        checked: (currentForm.checkboxChecked) ? true : null
      }));
    }
    return list;
  }

  _clickHandler(filledFormId, event) {
    event.redraw = false;
    fillRequestForms.selectForm(filledFormId, event.target.checked);
  }

  _createSmallHeader(currentForm) {
    let smallHeader = '';

    if (currentForm.email) {
      smallHeader = `${labels.l_17}: ${currentForm.email}`;
    }
    else if (currentForm.name) {
      smallHeader = `${labels.l_17}: ${currentForm.name}`;
    }
    else {
      smallHeader = `${labels.l_17}: ${labels.l_25}`;
    }
    return smallHeader;
  }
}

export default FilledFormsList;
