import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import documents from '../../models/get-editor-access-links/documents';
import linkMaker from '../../models/get-editor-access-links/link-maker';
import labels from '../../labels';

class LinkMakerSection {
  view(vnode) {
    let insertType = linkMaker.getInsertType();
    let lifetime = linkMaker.getLifetime();
    let selectedDocuments = documents.getSelectedDocumentsList();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_31}:`),
        m('input', {
          type: 'number',
          style: 'width: 100%; text-align: right;',
          value: lifetime,
          onchange: this._fieldChangeHandler.bind(this),
          min: 1,
          max: 999
        })
      ]),
      m('div', {class: 'col-12-sm'},
        m(InsertTypesRadiogroup, {
          currentValue: insertType,
          callback: this._radioClickHandler.bind(this),
          simplifiedView: true
        })
      ),
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          class: 'action',
          style: 'width: 100%;',
          disabled: (selectedDocuments.length === 0) ? true : null,
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_30)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    event.redraw = false;
    console.log(linkMaker.getInsertType());
  }

  _radioClickHandler(event) {
    event.redraw = false;
    linkMaker.setInsertType(event.target.value);
  }

  _fieldChangeHandler(event) {
    event.redraw = false;
    linkMaker.setLifetime(event.target.value);
  }
}

export default LinkMakerSection;
