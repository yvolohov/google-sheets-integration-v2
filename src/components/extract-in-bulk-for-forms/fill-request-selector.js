import m from 'mithril';
import BaseSelector from '../common/base-selector';
import fillRequests from '../../models/extract-in-bulk-for-forms/fill-requests';
import fillRequestForms from '../../models/extract-in-bulk-for-forms/fill-request-forms';
import labels from '../../labels';

class FillRequestSelector extends BaseSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'block form-group'}, [
          m('label', {class: 'bgl', for: 'fill-request-select'}, `${labels.l_21}:`),
          m('select', {
            id: 'fill-request-select',
            style: 'width: 100%; text-align: left;',
            onchange: this._changeHandler.bind(this)
          },
          this._makeList())
        ])
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'mgl'}, `${labels.l_22}:`),
        m('div', this._prepareId())
      ])
    ]);
  }

  _makeList() {
    let selectedFillRequestId = fillRequests.getSelectedFillRequestId();
    let settings = this._makeOptionSettings(0, selectedFillRequestId);
    let list = [m('option', settings, '...')];
    let fillRequestsData = fillRequests.getFillRequestsList();

    for (let fillRequestIndex in fillRequestsData) {
      let currentFillRequest = fillRequestsData[fillRequestIndex];
      let settings = this._makeOptionSettings(currentFillRequest.fillable_form_id, selectedFillRequestId);
      list.push(m('option', settings, currentFillRequest.document_name));
    }
    return list;
  }

  _prepareId() {
    let selectedFillRequest = fillRequests.getSelectedFillRequest();

    if (selectedFillRequest === null) {
      return m('div', {class: 'ml'}, '...');
    }

    let properties = {
      href: selectedFillRequest.url,
      class: 'ml',
      target: '_blank'
    };
    return m('a', properties, selectedFillRequest.fillable_form_id);
  }

  _changeHandler(event) {
    let fillRequestId = event.target.value;
    fillRequests.setSelectedFillRequestId(fillRequestId);
    fillRequestForms.setForms(fillRequestId, () => {m.redraw();})
  }
}

export default FillRequestSelector;
