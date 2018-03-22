import m from 'mithril';
import ListItem from '../common/list-item';
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
      let upArrowHandler = (idx > 0)
        ? this._arrowHandler.bind(this, idx, true, model) : null;
      let downArrowHandler = (idx < (selectedDocuments.length - 1))
        ? this._arrowHandler.bind(this, idx, false, model) : null;

      list.push(m(ListItem, {
        showArrows: true,
        showCheckbox: false,
        bigHeader: currentDocument.name,
        smallHeader: currentDocument.id,
        upArrowHandler: upArrowHandler,
        downArrowHandler: downArrowHandler
      }));
    }
    return list;
  }

  _arrowHandler(idx, up, model, event) {
    event.preventDefault();
    model.moveSelectedDocument(idx, up);
  }
}

export default SelectedDocumentsList;
