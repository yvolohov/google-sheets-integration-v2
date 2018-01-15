import m from 'mithril';
import fillRequests from '../../models/fill-requests';
import labels from '../../labels';

class RowFillRequestId {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'gray'}, `${labels.l_22}:`),
        m('div', {style: 'height: 25px;'}, this._prepareId())
      ])
    ]);
  }

  _clickHandler(event) {
    event.preventDefault();
  }

  _prepareId() {
    let selectedFillRequest = fillRequests.getSelectedFillRequest();

    return (selectedFillRequest !== null)
      ? m('a', {href: '#', onclick: this._clickHandler.bind(this)}, selectedFillRequest.fillable_form_id)
      : '...';
  }
}

export default RowFillRequestId;
