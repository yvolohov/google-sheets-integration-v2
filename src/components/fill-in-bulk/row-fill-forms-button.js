import m from 'mithril';
import documents from '../../models/documents';
import labels from '../../labels';

class RowFillFormsButton {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('button', this._setAvailability({
          id: 'fill-forms-button',
          class: 'action',
          style: 'width: 100%',
          onclick: this._clickHandler.bind(this)
        }), labels.l_24)
      ])
    ]);
  }

  _setAvailability(buttonSettings) {
    if (documents.getSelectedDocumentId() === 0) {
      buttonSettings['disabled'] = 'disabled';
    }
    return buttonSettings;
  }

  _clickHandler(event) {
    console.log('click !!!');
  }
}

export default RowFillFormsButton;
