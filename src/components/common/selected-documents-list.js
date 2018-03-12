import m from 'mithril';
import ListItemTwo from '../common/list-item-two';
import labels from '../../labels';

class SelectedDocumentsList {
  view(vnode) {
    let model = vnode.attrs.model;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_29}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', this._makeList(model))
        ])
      ])
    ]);
  }

  _makeList(model) {
    let list = [];
    let selectedDocuments = model.getSelectedDocumentsList();

    for (var idx = 0; idx < selectedDocuments.length; idx++) {
      let currentDocument = selectedDocuments[idx];
      let upCallback = (idx > 0)
        ? this._clickArrowHandler.bind(this, idx, true, model) : null;
      let downCallback = (idx < (selectedDocuments.length - 1))
        ? this._clickArrowHandler.bind(this, idx, false, model) : null;

      list.push(m(ListItemTwo, {
        bigHeader: currentDocument.name,
        smallHeader: currentDocument.id,
        upCallback: upCallback,
        downCallback: downCallback
      }));
    }
    return list;
  }

  _clickArrowHandler(idx, up, model, event) {
    event.preventDefault();
    model.moveSelectedDocument(idx, up);
  }
}

export default SelectedDocumentsList;
