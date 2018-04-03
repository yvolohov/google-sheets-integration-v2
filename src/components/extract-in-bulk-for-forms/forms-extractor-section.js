import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import formsExtractor from '../../models/extract-in-bulk-for-forms/forms-extractor';
import labels from '../../labels';

class FormsExtractorSection {
  view(vnode) {
    let insertType = formsExtractor.getInsertType();
    let isButtonDisabled = formsExtractor.isButtonDisabled();

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
        }, labels.l_41)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    m.route.set('/loading');
    event.redraw = false;
    formsExtractor.insertFormsData(() => {
      m.route.set('/extract-in-bulk-for-forms');
    });
  }

  _radioClickHandler(event) {
    event.redraw = false;
    formsExtractor.setInsertType(event.target.value);
  }
}

export default FormsExtractorSection;
