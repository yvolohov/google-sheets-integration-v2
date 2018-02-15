// -= AUTHORIZATION =-

function ccCreateAddonMenu()
{
  var pdfService = authorizationModel.getService();
  authorizationView.createAddonMenu(pdfService);
}

function ccAuthorize()
{
  var pdfService = authorizationModel.getService();
  authorizationView.showAuthorizationPage(pdfService);
}

function ccUnauthorize()
{
  var pdfService = authorizationModel.getService();
  authorizationModel.removeOAuth2Token();
  authorizationView.createAddonMenu(pdfService);
}

function ccShowAuthInfo()
{
  authorizationView.showAuthInfo();
}

function ccAuthPDFfillerCallback(request)
{
  var isAuthorized = authorizationModel.storeOAuth2Token(request);
  var pdfService = authorizationModel.getService();
  authorizationView.createAddonMenu(pdfService);
  return authorizationView.showAuthorizationEndPage(isAuthorized);
}

// -= OPERATIONS =-

function ccOperations()
{
  operationsView.showOperationsPage();
}

function ccErrors(errors)
{
  var ui = SpreadsheetApp.getUi();
  ui.alert('Error', JSON.stringify(errors), ui.ButtonSet.OK);
}

// -= DOCUMENTS =-

function ccGetDocuments(perPage, page)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return documentsModel.getDocuments(apiRoot, accessToken, perPage, page);
}

function ccGetDocumentFields(documentId)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return documentsModel.getDocumentFields(apiRoot, accessToken, documentId);
}

function ccGetEditorAccessLink(documentId, expireForExisting, expireForNew)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  expireForExisting = expireForExisting || 1;
  expireForNew = expireForNew || (expireForExisting * 3);
  return documentsModel.getEditorAccessLink(apiRoot, accessToken, documentId, expireForExisting, expireForNew);
}

// -= DATA HEADER =-

function ccCreateDataHeader(templateId, headerData, headerType)
{
  return dataHeaderModel.createDataHeader(templateId, headerData, headerType);
}

// -= CREATE DOCUMENTS FROM TEMPLATE =-

function ccReadSelectedCells()
{
  return formCreatorModel.readSelectedCells();
}

// -= FILL REQUESTS =-

function ccGetFillRequests(perPage, page)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return fillRequestsModel.getFillableForms(apiRoot, accessToken, perPage, page);
}

function ccGetFilledForms(perPage, page, additionalParameters)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return fillRequestsModel.getFilledForms(apiRoot, accessToken, additionalParameters.fillableFormId, perPage, page);
}

// -= FOLDERS =-

function ccGetFolders(perPage, page)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return foldersModel.getFolders(apiRoot, accessToken, perPage, page);
}
