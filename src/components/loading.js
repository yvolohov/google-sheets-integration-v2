import m from 'mithril';
import BasePage from './base-page';

class Loading extends BasePage {
  constructor() {
    super([]);
  }

  view() {
    return this.getLoadingScreen();
  }
}

export default Loading;
