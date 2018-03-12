import m from 'mithril';
import documents from '../../models/fill-in-bulk/documents';
import labels from '../../labels';

class FillFormsButton {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          id: 'fill-forms-button',
          class: 'action',
          style: 'width: 100%',
          disabled: (documents.getSelectedDocumentId() === 0) ? true : null,
          onclick: this._clickHandler.bind(this)
        }, labels.l_24)
      ])
    ]);
  }

  _clickHandler(event) {
    console.log('click !!!');
  }
}

export default FillFormsButton;
