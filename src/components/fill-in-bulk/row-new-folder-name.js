import m from 'mithril';
import labels from '../../labels';

class RowNewFolderName {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('label', {class: 'gray', for: 'folder-name-input'}, `${labels.l_18}:`),
        m('input', {
          id: 'folder-name-input',
          type: 'text',
          placeholder: labels.l_19,
          style: 'width: 100%;'
        })
      ])
    ]);
  }
}

export default RowNewFolderName;
