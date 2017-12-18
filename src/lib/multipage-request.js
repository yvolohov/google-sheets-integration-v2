class MultipageRequest {
  constructor(method) {
    this.method = method;
    this.perPage = 100;
  }

  setMethod(method) {
    this.method = method;
  }

  setPerPage(perPage=100) {
    this.perPage = perPage;
  }

  get(callback, postCallback=null) {
    var results = [];
    var errors = [];

    /* get first page */
    let firstPage = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {resolve(response);})
        [this.method](this.perPage, 1);
    });

    /* proccess result of first page, get next pages */
    let nextPages = firstPage.then((response) => {
      let pagesPromises = [];
      let count = (response.responseCode === 200) ? this._getCountOfPages(response) : 1;
      callback(response, results, errors);

      for (let page = 2; page <= count; page++) {
        pagesPromises.push(new Promise((resolve) => {
          google.script.run
            .withSuccessHandler((response) => {resolve(response);})
            [this.method](this.perPage, page);
        }));
      }
      return Promise.all(pagesPromises);
    });

    /* process result of next pages */
    let postProcess = nextPages.then((responses) => {
      responses.forEach((response) => {
        callback(response, results, errors);
      });

      if (postCallback !== null) {
        postCallback(results, errors);
      }
      return Promise.resolve({results: results, errors: errors});
    });

    return postProcess;
  }

  _getCountOfPages(response) {
    let content = response.responseContent;
    let total = (content.total && (parseInt(content.total) !== NaN)) ? parseInt(content.total) : 0;
    return Math.ceil(total / this.perPage);
  }
}

export default MultipageRequest;
