import m from 'mithril';
import ButtonToMenu from './button-to-menu';

class PageFillInBulk {
  view() {
    return m('div', {class: 'container'}, [
      m(ButtonToMenu),
      'fill-in-bulk'
    ]);
  }
}

export default PageFillInBulk;
