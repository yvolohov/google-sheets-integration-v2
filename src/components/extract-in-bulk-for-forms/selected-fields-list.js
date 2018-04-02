import m from 'mithril';
import ListItem from '../common/list-item';
import formsFields from '../../models/extract-in-bulk-for-forms/forms-fields';
import labels from '../../labels';

class SelectedFieldsList {
  view(vnode) {
    let content = (!formsFields.isLoading())
      ? this._makeList()
      : this._makeLoader();

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_33}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', content)
        ])
      ])
    ]);
  }

  _makeList() {
    let list = [];
    let fields = formsFields.getFields();

    for (var idx = 0; idx < fields.length; idx++) {
      let currentField = fields[idx];
      
    }
    return list;
  }

  _makeLoader() {
    return m('div', {
      class: 'mgl',
      style: 'text-align: center; margin-top: 5px;'
    }, labels.l_6);
  }
}

export default SelectedFieldsList;
