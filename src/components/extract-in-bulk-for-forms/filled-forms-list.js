import m from 'mithril';
import ListItem from '../common/list-item';
import fillRequestForms from '../../models/extract-in-bulk-for-forms/fill-request-forms';
import labels from '../../labels';

class FilledFormsList {
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
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true) : null;
      let downArrowHandler = (idx < (forms.length - 1))
        ? this._arrowHandler.bind(this, idx, false) : null;

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: true,
        checkboxFlag: (currentForm.flag) ? true : null,
        bigHeader: `${labels.l_16}: #${currentForm.filledFormId}`,
        smallHeader: this._createSmallHeader(currentForm),
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

  _checkboxHandler(filledFormId, event) {
    event.redraw = false;
    fillRequestForms.selectForm(filledFormId, event.target.checked);
  }

  _arrowHandler(idx, up, event) {
    event.preventDefault();
    fillRequestForms.moveForm(idx, up);
  }
}

export default FilledFormsList;
