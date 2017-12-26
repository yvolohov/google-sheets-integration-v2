import m from 'mithril';
import labels from '../labels';

class RowFieldsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'template-fields-div'}, `${labels.l_11}:`),
        m('div', {style: 'width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px;'}, [])
      ])
    ]);
  }
}

export default RowFieldsList;
