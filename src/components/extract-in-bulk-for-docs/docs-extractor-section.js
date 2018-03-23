import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import documents from '../../models/extract-in-bulk-for-docs/documents';
import docsExtractor from '../../models/extract-in-bulk-for-docs/docs-extractor';
import labels from '../../labels';

class DocsExtractorSection {
  view(vnode) {
    let insertType = docsExtractor.getInsertType();
    let selectedDocuments = documents.getSelectedDocumentsList();

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
          disabled: (selectedDocuments.length === 0) ? true : null,
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_32)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    m.route.set('/loading');
    event.redraw = false;
    docsExtractor.insertDocumentsData(() => {
      m.route.set('/extract-in-bulk-for-docs');
    });
  }

  _radioClickHandler(event) {
    event.redraw = false;
    docsExtractor.setInsertType(event.target.value);
  }
}

export default DocsExtractorSection;
