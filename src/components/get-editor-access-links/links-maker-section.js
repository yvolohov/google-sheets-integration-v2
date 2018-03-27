import m from 'mithril';
import InsertTypesRadiogroup from '../common/insert-types-radiogroup';
import linksMaker from '../../models/get-editor-access-links/links-maker';
import labels from '../../labels';

class LinksMakerSection {
  view(vnode) {
    let insertType = linksMaker.getInsertType();
    let lifetime = linksMaker.getLifetime();
    let isButtonDisabled = linksMaker.isButtonDisabled();

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
          disabled: isButtonDisabled,
          onclick: this._buttonClickHandler.bind(this)
        }, labels.l_30)
      ])
    ]);
  }

  _buttonClickHandler(event) {
    m.route.set('/loading');
    event.redraw = false;
    linksMaker.insertLinks(() => {
      m.route.set('/get-editor-access-links');
    });
  }

  _radioClickHandler(event) {
    event.redraw = false;
    linksMaker.setInsertType(event.target.value);
  }

  _fieldChangeHandler(event) {
    event.redraw = false;
    linksMaker.setLifetime(event.target.value);
  }
}

export default LinksMakerSection;
