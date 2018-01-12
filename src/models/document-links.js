import errors from './errors';

class DocumentLinks {
  constructor() {
    this.links = {};
    this.selectedDocumentId = 0;
  }

  setLink(documentId, expireForExisting=1, expireForNew=3, callback=null) {
    this.selectedDocumentId = documentId;

    if (this.selectedDocumentId == 0 || (this.selectedDocumentId in this.links)) {
      if (callback !== null) {
        callback();
      }
    }
    else {
      this._loadLink(documentId, expireForExisting, expireForNew, callback);
    }
  }

  _loadLink(documentId, expireForExisting, expireForNew, callback) {
    let link = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {resolve(response);})
        .ccGetEditorAccessLink(documentId, expireForExisting, expireForNew);
    });

    link.then((response) => {
      console.log(response.responseContent);
    });
  }
}

export default new DocumentLinks();
