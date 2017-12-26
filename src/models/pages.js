import documents from './documents';
import folders from './folders';

class Pages {
  constructor() {
    this.pageFillInBulkLoaded = false;
  }

  pageFillInBulkIsLoaded() {
    return this.pageFillInBulkLoaded;
  }

  loadPageFillInBulk(callback=null) {
    Promise.all([
      documents.load(),
      folders.load()
    ])
    .then((result) => {
      this.pageFillInBulkLoaded = true;

      if (callback !== null) {
        callback();
      }
    });
  }
}

export default new Pages();
