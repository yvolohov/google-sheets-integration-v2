import m from 'mithril';
import labels from '../../labels';

const SCROLL_BOX_STYLES = `width: 100%; height: 300px; border: 1px solid silver; border-radius: 2px; overflow-x: hidden; overflow-y: scroll;`;

class RowFilledFormsList {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'template-fields-div'}, `${labels.l_23}:`),
        m('div', {style: SCROLL_BOX_STYLES}, [
          m('div', [])
        ])
      ])
    ]);
  }
}

export default RowFilledFormsList;