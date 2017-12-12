import m from 'mithril';

class RowDocumentSelector {
  view(vnode) {
    return m('div', {class: 'row'}, [
      m('div', {class: 'col-12-sm'}, [
        m('div', {class: 'block form-group'}, [
          m('label', {class: 'gray', for: 'document-select'}, vnode.attrs.selectLabel + ':'),
          m('select', {id: 'document-select', style: 'width: 100%; text-align: left;'}, [
            m('option', {value: '0', selected: 'selected'}, '...')
          ])
        ])
      ])
    ]);
  }
}

export default RowDocumentSelector;
