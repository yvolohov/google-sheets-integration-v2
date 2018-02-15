function FoldersModel()
{
  this.getFolders = function(apiRoot, accessToken, perPage, page)
  {
    var route = apiRoot + '/v2/folders?page=' + page + '&per_page=' + perPage + '&order_by=name&order=asc';

    var response = UrlFetchApp.fetch(
      route, {
        headers: {Authorization: 'Bearer ' + accessToken},
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'GET', response.getResponseCode(), JSON.parse(response.getContentText()));
  }
}

var foldersModel = new FoldersModel();
