import errors from '../common/errors';

class DocumentLinks {
  constructor() {
    this.links = {};
  }

  loadLink(documentId, expireForExisting=1, expireForNew=30, callback=null) {
    if (documentId in this.links) {
      if (callback !== null) {
        callback(this.links[documentId]);
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
      if (response.responseCode !== 200) {
        errors.addPortion([response]);
        errors.send();
        return;
      }

      this.links[documentId] = response.responseContent;

      if (callback !== null) {
        callback(response.responseContent);
      }
    });
  }
}

export default new DocumentLinks();
