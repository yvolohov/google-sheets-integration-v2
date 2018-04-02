import m from 'mithril';
import ListItem from '../common/list-item';
import fillRequestForms from '../../models/extract-in-bulk-for-forms/fill-request-forms';
import labels from '../../labels';

class SelectedFormsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_16}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', this._makeList())
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let forms = fillRequestForms.getSelectedForms();

    for (var idx = 0; idx < forms.length; idx++) {
      let currentForm = forms[idx];
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true) : null;
      let downArrowHandler = (idx < (forms.length - 1))
        ? this._arrowHandler.bind(this, idx, false) : null;

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: false,
        bigHeader: `#${currentForm.filledFormId}`,
        smallHeader: this._createSmallHeader(currentForm),
        upArrowHandler: upArrowHandler,
        downArrowHandler: downArrowHandler
      }));
    }
    return list;
  }

  _createSmallHeader(currentForm) {
    if (currentForm.email) {
      return currentForm.email;
    }
    else if (currentForm.name) {
      return currentForm.name;
    }
    else {
      return labels.l_25;
    }
  }

  _arrowHandler(idx, up, event) {
    event.preventDefault();
    fillRequestForms.moveSelectedForm(idx, up);
  }
}

export default SelectedFormsList;
