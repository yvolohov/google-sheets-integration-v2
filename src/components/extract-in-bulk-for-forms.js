import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import FillRequestSelector from './extract-in-bulk-for-forms/fill-request-selector';
import FilledFormsList from './extract-in-bulk-for-forms/filled-forms-list';
import FormsExtractorSection from './extract-in-bulk-for-forms/forms-extractor-section';
import labels from '../labels';

class ExtractInBulkForForms extends BasePage {
  constructor() {
    super(['fillRequests']);
  }

  oninit() {
    this.loadModels();
  }

  view() {
    if (!this.areModelsLoaded()) {
      return this.getLoadingScreen();
    }

    return m('div', {class: 'container'}, [
      m(PageHeader, {pageLabel: labels.l_3}),
      m(FillRequestSelector),
      m(FilledFormsList),
      m(FormsExtractorSection)
    ]);
  }
}

export default ExtractInBulkForForms;
