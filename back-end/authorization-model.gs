function AuthorizationModel()
{
  /* oauth client in PDFfiller account volokov.yaroslav@pdffiller.team */
  this.PAYMENTS_ROOT = 'https://developers.pdffiller.com';
  this.PDFFILLER_API_ROOT = 'https://api.pdffiller.com';
  this.CLIENT_ID = '';
  this.CLIENT_SECRET = '';
  this.service = null;
  
  this.getService = function()
  {
    if (!this.service) {
      this.service = OAuth2.createService('pdffiller')
        .setAuthorizationBaseUrl(this.PAYMENTS_ROOT + '/api_access')
        .setTokenUrl(this.PDFFILLER_API_ROOT + '/v2/oauth/token')
        .setClientId(this.CLIENT_ID)
        .setClientSecret(this.CLIENT_SECRET)
        .setCallbackFunction('ccAuthPDFfillerCallback')
        .setPropertyStore(PropertiesService.getUserProperties());
    }
    return this.service;
  }

  this.storeOAuth2Token = function(request)
  {
    return this.getService().handleCallback(request);
  }

  this.removeOAuth2Token = function()
  {
    this.getService().setPropertyStore(PropertiesService.getUserProperties()).reset();
  }
}

var authorizationModel = new AuthorizationModel();
