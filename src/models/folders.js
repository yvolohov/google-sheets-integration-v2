import MultipageRequest from '../lib/multipage-request';

class Folders {
  constructor() {
    this.list = [];
    this.folders = {};
    this.selectedFolderId = 0;
  }

  load() {
    let multipageRequest = new MultipageRequest('ccGetFolders');
    multipageRequest.setPerPage(100);

    return multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this)
    );
  }

  getSelectedFolder() {
    return (this.selectedFolderId in this.folders)
      ? this.folders[this.selectedFolderId] : null;
  }

  getSelectedFolderId() {
    return this.selectedFolderId;
  }

  setSelectedFolderId(folderId) {
    this.selectedFolderId = folderId;
  }

  getFoldersList() {
    return this.list;
  }

  _pageCallback(response, results, errors) {
    if (response.responseCode !== 200) {
      errors.push(response);
      return;
    }

    let folders = response.responseContent.items;

    for (let folderId in folders) {
      let currentFolder = folders[folderId];
      results.push(currentFolder);
    }
  }

  _postCallback(results, errors) {
    let folders = {};

    for (let folderId in results) {
      let currentFolder = results[folderId];
      folders[currentFolder.folder_id] = currentFolder;
    }
    this.folders = folders;
    this.list = results;
  }
}

export default new Folders();
