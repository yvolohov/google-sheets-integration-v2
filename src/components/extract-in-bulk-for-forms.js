import m from 'mithril';
import PageLoading from './page-loading';
import PageHeader from './common/page-header';

/*
import RowFillRequestSelector from './get-form-fields/row-fill-request-selector';
import RowFilledFormsList from './get-form-fields/row-filled-forms-list';
*/

import labels from '../labels';
import modelsLoader from '../models/common/models-loader';

class ExtractInBulkForForms {
  constructor() {
    this.models = ['fillRequests'];
  }

  oninit() {
    let notLoaded = modelsLoader.getNotLoadedModels(this.models);

    if (notLoaded.length > 0) {
      modelsLoader.loadModels(notLoaded, () => {m.redraw();});
    }
  }

  view() {
    let notLoaded = modelsLoader.getNotLoadedModels(this.models);

    if (notLoaded.length > 0) {
      return m(PageLoading);
    }

    return m('div', {class: 'container'}, [
      m(PageHeader, {pageLabel: labels.l_3}),
      //m(RowFillRequestSelector),
      //m(RowFilledFormsList)
    ]);
  }
}

export default ExtractInBulkForForms;
