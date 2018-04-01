
export function srvSelectListItem(collection, callback, flag) {
  let idx = collection.findIndex(callback);

  if (idx > -1) {
    collection[idx].flag = flag;
  }
}

export function srvMoveListItem(collection, idx, up) {
  let currentPosition = idx;
  let newPosition = (up) ? idx - 1 : idx + 1;

  if (newPosition < 0 || newPosition >= collection.length) {
    return;
  }
  let remembered = collection[newPosition];
  collection[newPosition] = collection[currentPosition];
  collection[currentPosition] = remembered;
}

export function srvGetSelectionState(currentItemId, selectedItemId) {
  return (parseInt(currentItemId) === selectedItemId) ? 'selected' : null;
}
