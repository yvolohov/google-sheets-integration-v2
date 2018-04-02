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

function ccCreateNewDocument(templateId, templateName, folderId, dataBundle, orderNumber)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  folderId = folderId || 0;
  orderNumber = orderNumber || templateId;
  return documentsModel.createNewDocument(apiRoot, accessToken, templateId, templateName, folderId, dataBundle, orderNumber);
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

function ccGetFilledFormFields(fillableFormId, filledFormId)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return fillRequestsModel.getFilledFormFields(apiRoot, accessToken, fillableFormId, filledFormId);
}

// -= FOLDERS =-

function ccGetFolders(perPage, page)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return foldersModel.getFolders(apiRoot, accessToken, perPage, page);
}

function ccCreateNewFolder(folderName)
{
  var accessToken = authorizationModel.getService().getAccessToken();
  var apiRoot = authorizationModel.PDFFILLER_API_ROOT;
  return foldersModel.createNewFolder(apiRoot, accessToken, folderName);
}

// -= OPERATIONS WITH SPREADSHEET =-

function ccInsertDataHeader(templateId, headerData, headerType)
{
  spreadsheetModel.insertDataHeader(templateId, headerData, headerType);
}

function ccInsertDocumentsData(documentsData, insertType)
{
  spreadsheetModel.insertDocumentsData(documentsData, insertType);
}

function ccInsertLinks(linksList, insertType)
{
  spreadsheetModel.insertEditorAccessLinks(linksList, insertType);
}

function ccReadSelectedCells()
{
  return spreadsheetModel.readSelectedCells();
}
