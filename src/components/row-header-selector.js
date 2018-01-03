import m from 'mithril';
import BaseSelector from './base-selector';
import labels from '../labels';

class RowHeaderSelector extends BaseSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'folder-select'}, `${labels.l_13}:`),
        m('select', {
          id: 'folder-select',
          style: 'width: 100%; text-align: left;'
        },
        [
          m('option', labels.l_14),
          m('option', labels.l_15),
          m('option', labels.l_16),
          m('option', labels.l_17)
        ])
      ])
    ]);
  }
}

export default RowHeaderSelector;
