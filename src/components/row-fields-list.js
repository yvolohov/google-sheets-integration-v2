import m from 'mithril';
import documentFields from '../models/document-fields';
import labels from '../labels';

class RowFieldsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'template-fields-div'}, `${labels.l_11}:`),
        m('div', {style: `width: 100%; height: 300px; border: 1px solid silver;
          border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`}, this._makeList())
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let fields = documentFields.getDocumentFields();

    for (let fieldIndex in fields) {
      let currentField = fields[fieldIndex];
      list.push(
        m('div', {}, currentField.name)
      );
    }
    return list;
  }
}

export default RowFieldsList;
