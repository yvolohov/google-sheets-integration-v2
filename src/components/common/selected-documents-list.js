import m from 'mithril';
import ListItemTwo from '../common/list-item-two';
import labels from '../../labels';

class SelectedDocumentsList {
  view(vnode) {
    let model = vnode.attrs.model;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_29}:`),
        m('div', {class: 'scroll-box'}, [
          m('div', this._makeList(model))
        ])
      ])
    ]);
  }

  _makeList(model) {
    return [];
  }
}

export default SelectedDocumentsList;
