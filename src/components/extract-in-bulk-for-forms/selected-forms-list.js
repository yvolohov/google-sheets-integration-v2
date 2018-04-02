import m from 'mithril';
import ListItem from '../common/list-item';
import labels from '../../labels';

class SelectedFormsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'bgl'}, `${labels.l_16}:`),
        m('div', {class: 'small-scroll-box'}, [
          m('div', [])
        ])
      ])
    ]);
  }
}

export default SelectedFormsList;
