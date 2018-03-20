import m from 'mithril';

class ListItemThree {
  view(vnode) {
    let checkboxSettings = {
      type: 'checkbox'
    };

    let arrowUp = String.fromCharCode(0x02C4);
    let arrowDown = String.fromCharCode(0x02C5);

    return m('div', [
      m('div', {class: 'list-column'}, [
        m('div', {class: 'arrow-box'}, this._makeLink(arrowUp, null)),
        m('div', {class: 'arrow-box'}, this._makeLink(arrowDown, null))
      ]),      
      m('div', {class: 'flag-box'}, [
        m('input', checkboxSettings)
      ]),
      m('div', {class: 'list-column', style: 'max-width: 170px;'}, [
        m('div', {class: 'ml'}, 'big header'),
        m('div', {class: 'sgl'}, 'small header')
      ])
    ]);
  }

  _makeLink(arrow, callback) {
    if (!callback) {
      return m('span', {class: 'bgl'}, arrow);
    }
    return m('a', {href: '#', class: 'bl', onclick: callback}, arrow);
  }
}

export default ListItemThree;
