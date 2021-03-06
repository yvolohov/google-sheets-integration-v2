import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import FillRequestSelector from './extract-in-bulk-for-forms/fill-request-selector';
import FormsList from './extract-in-bulk-for-forms/forms-list';
import SelectedFormsList from './extract-in-bulk-for-forms/selected-forms-list';
import SelectedFieldsList from './extract-in-bulk-for-forms/selected-fields-list';
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
      m(FormsList),
      m(SelectedFormsList),
      m(SelectedFieldsList),
      m(FormsExtractorSection)
    ]);
  }
}

export default ExtractInBulkForForms;
