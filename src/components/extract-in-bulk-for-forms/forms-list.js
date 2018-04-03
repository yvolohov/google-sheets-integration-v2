import m from 'mithril';
import ListItem from '../common/list-item';
import fillRequests from '../../models/extract-in-bulk-for-forms/fill-requests';
import fillRequestForms from '../../models/extract-in-bulk-for-forms/fill-request-forms';
import formsFields from '../../models/extract-in-bulk-for-forms/forms-fields';
import labels from '../../labels';

class FormsList {
  view(vnode) {
    let content = (!fillRequestForms.isLoading())
      ? this._makeList()
      : this._makeLoader();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_23}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', content)
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let forms = fillRequestForms.getForms();

    for (var idx = 0; idx < forms.length; idx++) {
      let currentForm = forms[idx];
      let checkboxHandler = this._checkboxHandler.bind(this, currentForm.filledFormId);

      list.push(m(ListItem, {
        showArrows: false,
        showCheckbox: true,
        checkboxFlag: (currentForm.flag) ? true : null,
        bigHeader: this._createBigHeader(currentForm),
        smallHeader: currentForm.filledFormId,
        checkboxHandler: checkboxHandler
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

  _createBigHeader(currentForm) {
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

  _checkboxHandler(filledFormId, event) {
    let fillRequestId = fillRequests.getSelectedFillRequestId();
    let flag = event.target.checked;

    fillRequestForms.selectForm(filledFormId, flag);
    formsFields.refreshFields(
      fillRequestId,
      filledFormId,
      flag,
      this._afterRefreshing.bind(this),
      this._afterRefreshing.bind(
        this,
        fillRequestForms.selectForm.bind(fillRequestForms, filledFormId, false)
      )
    );
  }

  _afterRefreshing(callback) {
    if (callback) {
      callback();
    }
    m.redraw();
  }
}

export default FormsList;
