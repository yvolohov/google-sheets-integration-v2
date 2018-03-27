import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import documentsExtractor from '../../models/extract-in-bulk-for-docs/documents-extractor';
import labels from '../../labels';

class DocumentsExtractorSection {
  view(vnode) {
    let insertType = documentsExtractor.getInsertType();
    let isButtonDisabled = documentsExtractor.isButtonDisabled();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m(InsertTypesRadiogroup, {
          currentValue: insertType,
          callback: this._radioClickHandler.bind(this),
          simplifiedView: false
        })
      ]),
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          class: 'action',
          style: 'width: 100%;',
          disabled: isButtonDisabled,
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_32)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    m.route.set('/loading');
    event.redraw = false;
    documentsExtractor.insertDocumentsData(() => {
      m.route.set('/extract-in-bulk-for-docs');
    });
  }

  _radioClickHandler(event) {
    event.redraw = false;
    documentsExtractor.setInsertType(event.target.value);
  }
}

export default DocumentsExtractorSection;
