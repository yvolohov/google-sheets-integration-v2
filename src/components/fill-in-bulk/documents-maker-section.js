import m from 'mithril';
import documentsMaker from '../../models/fill-in-bulk/documents-maker';
import labels from '../../labels';

class DocumentsMakerSection {
  view(vnode) {
    let isButtonDisabled = documentsMaker.isButtonDisabled();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          class: 'action',
          style: 'width: 100%',
          disabled: isButtonDisabled,
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_24)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    m.route.set('/loading');
    event.redraw = false;

    documentsMaker.makeDocuments(() => {
      m.route.set('/filled-in-bulk-documents');
    }, () => {
      m.route.set('/fill-in-bulk');
    });
  }
}

export default DocumentsMakerSection;
