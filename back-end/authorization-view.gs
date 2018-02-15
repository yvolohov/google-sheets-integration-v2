function AuthorizationView()
{
  this.createAddonMenu = function(pdfService)
  {
    var menu = SpreadsheetApp.getUi().createAddonMenu();

    if (pdfService.hasAccess()) {
      menu.addItem('Show auth info', 'ccShowAuthInfo');
      menu.addItem('Operations', 'ccOperations');
      menu.addItem('Unauthorize', 'ccUnauthorize');
    }
    else {
      menu.addItem('Authorize', 'ccAuthorize');
    }
    menu.addToUi();
  }

  this.showAuthorizationPage = function(pdfService)
  {
    var ui = SpreadsheetApp.getUi();
    var template = HtmlService.createTemplateFromFile('authorization-page');

    template.data = {
      authorizationUrl: pdfService.getAuthorizationUrl()
    };

    var page = template.evaluate()
      .setTitle('Authorization')
      .setWidth(350);

    ui.showSidebar(page);
  }

  this.showAuthorizationEndPage = function(isAuthorized)
  {
    if (isAuthorized) {
      return this._prepareAuthorizationEndPage('Success! You can close this tab.');
    } else {
      return this._prepareAuthorizationEndPage('Denied. You can close this tab');
    }
  }

  this.showAuthInfo = function()
  {
    SpreadsheetApp.getUi().alert(PropertiesService.getUserProperties().getProperty('oauth2.pdffiller'));
  }

  this._prepareAuthorizationEndPage = function(text)
  {
    var template = HtmlService.createTemplateFromFile('authorization-end-page');

    template.data = {
      text: text
    };

    return template.evaluate();
  }
}

var authorizationView = new AuthorizationView();
