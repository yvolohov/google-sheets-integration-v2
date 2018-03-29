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

  this.createNewFolder = function(apiRoot, accessToken, folderName)
  {
    var route = apiRoot + '/v2/folders';

    var response = UrlFetchApp.fetch(
      route, {
        method: 'post',
        contentType : 'application/json',
        headers: {Authorization: 'Bearer ' + accessToken},
        payload: JSON.stringify({
          name: folderName
        }),
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'POST', response.getResponseCode(), JSON.parse(response.getContentText()));
  }
}

var foldersModel = new FoldersModel();
