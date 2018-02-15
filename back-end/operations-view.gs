function OperationsView()
{
  this.showOperationsPage = function()
  {
    var ui = SpreadsheetApp.getUi();
    var template = HtmlService.createTemplateFromFile('operations-page');
    var page = template.evaluate()
      .setTitle('Operations')
      .setWidth(350);

    ui.showSidebar(page);
  }
}

var operationsView = new OperationsView();
