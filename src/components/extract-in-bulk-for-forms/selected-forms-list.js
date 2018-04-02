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

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: false,
        bigHeader: `#${currentForm.filledFormId}`,
        smallHeader: this._createSmallHeader(currentForm),
        upArrowHandler: null,
        downArrowHandler: null
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
}

export default SelectedFormsList;
