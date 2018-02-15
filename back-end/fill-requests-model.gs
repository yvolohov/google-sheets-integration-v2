function FillRequestsModel()
{
  this.getFillableForms = function(apiRoot, accessToken, perPage, page)
  {
    var route = apiRoot + '/v2/fillable_forms?page=' + page + '&per_page=' + perPage;

    var response = UrlFetchApp.fetch(
      route, {
        headers: {Authorization: 'Bearer ' + accessToken},
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'GET', response.getResponseCode(), JSON.parse(response.getContentText()));
  }

  this.getFilledForms = function(apiRoot, accessToken, fillableFormId, perPage, page)
  {
    var route = apiRoot + '/v2/fillable_forms/' + fillableFormId + '/filled_forms?page=' + page + '&per_page=' + perPage;

    var response = UrlFetchApp.fetch(
      route, {
        headers: {Authorization: 'Bearer ' + accessToken},
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'GET', response.getResponseCode(), JSON.parse(response.getContentText()));
  }
}

var fillRequestsModel = new FillRequestsModel();
