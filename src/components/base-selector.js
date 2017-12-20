class BaseSelector {
  _makeOptionSettings(currentItemId, selectedItemId) {
    let options = {value: currentItemId};

    if (currentItemId === selectedItemId) {
      options.selected = 'selected';
    }
    return options;
  }
}

export default BaseSelector;
