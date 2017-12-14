import MultipageRequest from '../lib/multipage-request';

class Documents {
  constructor() {
    this.list = [];
  }

  loadList() {
    let multipageRequest = new MultipageRequest('ccGetDocuments');
    multipageRequest.setPerPage(15);

    return multipageRequest.get(
      (response, result) => {result.push(response);},
      (result) => {console.log(result);}
    );
  }
}

export default new Documents();
