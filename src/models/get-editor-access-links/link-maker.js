import documents from './documents';
import errors from '../common/errors';

class LinkMaker {
  constructor() {
    this.lifetime = 180;
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  getLifetime() {
    return this.lifetime;
  }

  setLifetime(lifetime) {
    this.lifetime = parseInt(lifetime);
  }

  insertLinks(unlockScreenCallback) {
    let selectedDocuments = documents.getSelectedDocumentsList();
    let linksPromise = this._loadLinks(selectedDocuments);

    linksPromise.then((responses) => {
      let createdLinks = [];
      let erroredResponses = [];

      for (let responseIdx in responses) {
        let currentResponse = responses[responseIdx];

        if (currentResponse.responseCode !== 200) {
          erroredResponses.push(currentResponse);
          continue;
        }
        createdLinks.push(currentResponse.responseContent);
      }

      errors.send(erroredResponses);

      if (createdLinks.length === 0) {
        unlockScreenCallback();
        return;
      }

      google.script.run
        .withSuccessHandler(unlockScreenCallback)
        .withFailureHandler(unlockScreenCallback)
        .ccInsertLinks(createdLinks, this.insertType);
    });
  }

  _loadLinks(selectedDocuments) {
    let promises = [];

    for (let documentIdx in selectedDocuments) {
      let currentDocument = selectedDocuments[documentIdx];
      promises.push(new Promise((resolve) => {
        google.script.run
          .withSuccessHandler((response) => {resolve(response);})
          .ccGetEditorAccessLink(currentDocument.id, this.lifetime, this.lifetime * 2);
      }));
    }
    return Promise.all(promises);
  }
}

export default new LinkMaker();
