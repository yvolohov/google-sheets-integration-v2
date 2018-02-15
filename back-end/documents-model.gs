function DocumentsModel()
{
  this.getDocuments = function(apiRoot, accessToken, perPage, page)
  {
    var route = apiRoot + '/v2/templates?page=' + page + '&per_page=' + perPage + '&order_by=name&order=asc';

    var response = UrlFetchApp.fetch(
      route, {
        headers: {Authorization: 'Bearer ' + accessToken},
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'GET', response.getResponseCode(), JSON.parse(response.getContentText()));
  }

  this.getDocumentFields = function(apiRoot, accessToken, documentId)
  {
    var route = apiRoot + '/v2/templates/' + documentId + '/fields';

    var response = UrlFetchApp.fetch(
      route, {
        headers: {Authorization: 'Bearer ' + accessToken},
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'GET', response.getResponseCode(), JSON.parse(response.getContentText()));
  }

  this.getEditorAccessLink = function(apiRoot, accessToken, documentId, expireForExisting, expireForNew)
  {
    // get list of existing links
    var route = apiRoot + '/v2/templates/' + documentId + '/constructor';
    var result = this._getExistingEditorAccessLinks(accessToken, route);

    if (result.responseCode !== 200) {
      return result;
    }

    var items = (result.responseContent.items || []);

    // list of links is empty, create new link
    if (items.length === 0) {
      return this._createNewEditorAccessLink(accessToken, route, expireForNew);
    }

    items.sort(function(a, b) {
      return (a.expiration < b.expiration) ? 1 : -1;
    });

    // get link with latest expiration date
    var lastItem = items[0];
    var timeToExpiration = this._getDateDifference(lastItem.expiration);
    var expireTime = expireForExisting * 24 * 60 * 60 * 1000;

    // if latest link is expired, create new link
    if (timeToExpiration < expireTime) {
      return this._createNewEditorAccessLink(accessToken, route, expireForNew);
    }

    // return latest link
    result.responseContent = lastItem;
    return result;
  }

  this._createNewEditorAccessLink = function(accessToken, route, expire)
  {
    var response = UrlFetchApp.fetch(
      route, {
        method: 'post',
        payload: JSON.stringify({expire: expire}),
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'POST', response.getResponseCode(), JSON.parse(response.getContentText()));
  }

  this._getExistingEditorAccessLinks = function(accessToken, route)
  {
    var response = UrlFetchApp.fetch(
      route, {
        headers: {Authorization: 'Bearer ' + accessToken},
        muteHttpExceptions: true
      }
    );

    return createStandardResponse(route, 'GET', response.getResponseCode(), JSON.parse(response.getContentText()));
  }

  this._getDateDifference = function(ourDate)
  {
    var dateStr = ourDate.substr(0, 10);
    var timeStr = ourDate.substr(11);
    var ourISODate = new Date(dateStr + 'T' + timeStr + 'Z');
    var currentISODate = new Date((new Date()).toISOString());
    return (ourISODate.getTime() - currentISODate.getTime());
  }
}

var documentsModel = new DocumentsModel();
