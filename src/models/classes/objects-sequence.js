import { srvMoveListItem } from '../../lib/service-functions';

class ObjectsSequence {
  constructor() {
    this.loading = false;
    this.sequence = [];
  }

  isLoading() {
    return this.loading;
  }

  _getSequence() {
    return this.sequence;
  }

  _moveSequenceItem(idx, up) {
    srvMoveListItem(this.sequence, idx, up);
  }

  _refreshSequenceItems(item, searchCallback, flag) {
    if (flag) {
      this.sequence.push(selectedDocument);
      return;
    }

    let idx = this.sequence.findIndex(searchCallback);

    if (idx > -1) {
      this.sequence.splice(idx, 1);
    }
  }
}

export default ObjectsSequence;
