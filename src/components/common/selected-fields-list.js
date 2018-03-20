import m from 'mithril';
import ListItemThree from '../common/list-item-three';
import labels from '../../labels';

class SelectedFieldsList {
  view(vnode) {
    let model = vnode.attrs.model;

    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_33}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', this._makeList(model))
        ])
      ])
    ]);
  }

  _makeList(model) {
    let list = [];
    list.push(m(ListItemThree, {}));
    list.push(m(ListItemThree, {}));
    list.push(m(ListItemThree, {}));
    return list;
  }
}

export default SelectedFieldsList;
