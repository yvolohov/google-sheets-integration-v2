import m from 'mithril';
import documentMaker from '../../models/fill-in-bulk/document-maker';
import labels from '../../labels';

class DocumentMakerSection {
  view(vnode) {
    let isButtonDisabled = documentMaker.isButtonDisabled();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('button', {
          class: 'action',
          style: 'width: 100%',
          disabled: isButtonDisabled,
          onclick: this._clickHandler.bind(this)
        }, labels.l_24)
      ])
    ]);
  }

  _clickHandler(event) {
    console.log('click !!!');
  }
}

export default DocumentMakerSection;
