function include(filename)
{
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function createStandardResponse(route, method, responseCode, responseContent)
{
  var result = {};
  result.route = route;
  result.method = method;
  result.responseCode = responseCode;
  result.responseContent = responseContent;
  return result;
}
