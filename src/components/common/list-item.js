import m from 'mithril';

class ListItem {
  view(vnode) {
    let bigHeader = vnode.attrs.bigHeader;
    let smallHeader = vnode.attrs.smallHeader;
    let showArrows = vnode.attrs.showArrows;
    let showCheckbox = vnode.attrs.showCheckbox;
    let columns = [];

    if (showArrows) {
      let upArrowHandler = vnode.attrs.upArrowHandler;
      let downArrowHandler = vnode.attrs.downArrowHandler;
      columns.push(this._getArrowsColumn(upArrowHandler, downArrowHandler));
    }

    if (showCheckbox) {
      let checkboxFlag = vnode.attrs.checkboxFlag;
      let checkboxHandler = vnode.attrs.checkboxHandler;
      columns.push(this._getCheckboxColumn(checkboxFlag, checkboxHandler));
    }

    columns.push(this._getHeadersColumn(bigHeader, smallHeader));
    return m('div', columns);
  }

  _getArrowsColumn(upArrowHandler, downArrowHandler) {
    let upArrow = String.fromCharCode(0x02C4);
    let downArrow = String.fromCharCode(0x02C5);

    return m('div', {class: 'list-column'}, [
      m('div', {class: 'arrow-box'}, this._makeLink(upArrow, upArrowHandler)),
      m('div', {class: 'arrow-box'}, this._makeLink(downArrow, downArrowHandler))
    ]);
  }

  _getCheckboxColumn(checkboxFlag, checkboxHandler) {
    let checkboxSettings = {
      type: 'checkbox',
      checked: checkboxFlag,
      onclick: checkboxHandler
    };

    return m('div', {class: 'list-column'}, [
      m('div', {class: 'flag-box'}, [
        m('input', checkboxSettings)
      ])
    ]);
  }

  _getHeadersColumn(bigHeader, smallHeader) {
    return m('div', {class: 'list-column', style: 'max-width: 170px;'}, [
      m('div', {class: 'ml'}, bigHeader),
      m('div', {class: 'sgl'}, smallHeader)
    ]);
  }

  _makeLink(arrow, callback) {
    if (!callback) {
      return m('span', {class: 'bgl'}, arrow);
    }
    return m('a', {href: '#', class: 'bl', onclick: callback}, arrow);
  }
}

export default ListItem;
