import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import DocumentSelector from './fill-in-bulk/document-selector';
import FieldsList from './fill-in-bulk/fields-list';
import DataHeaderSection from './fill-in-bulk/data-header-section';
import FolderSelector from './fill-in-bulk/folder-selector';
import FillFormsButton from './fill-in-bulk/fill-forms-button';
import labels from '../labels';

class FillInBulk extends BasePage {
  constructor() {
    super(['documents', 'folders']);
  }

  oninit() {
    this.loadModels();
  }

  view() {
    if (!this.areModelsLoaded()) {
      return this.getLoadingScreen();
    }

    return m('div', {class: 'container'}, [
      m(PageHeader, {pageLabel: labels.l_1}),
      m(DocumentSelector),
      m(FieldsList),
      m(DataHeaderSection),
      m(FolderSelector),
      m(FillFormsButton)
    ]);
  }
}

export default FillInBulk;
