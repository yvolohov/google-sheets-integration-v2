import documents from './documents';
import folders from './folders';
import fillRequests from './fill-requests';
import errors from './errors';

class ModelsLoader {
  constructor() {
    this.models = {};
    this.modelsStatuses = {};
  }

  registerModel(modelName, model) {
    this.models[modelName] = model;
    this.modelsStatuses[modelName] = false;
  }

  getNotLoadedModels(checkedModels=[]) {
    let notLoadedModels = [];

    for (let modelIndex in checkedModels) {
      let currentModelName = checkedModels[modelIndex];

      if (!(currentModelName in this.modelsStatuses)) {
        throw new Error(`Model ${currentModelName} isn't registered`);
      }

      if (!this.modelsStatuses[currentModelName]) {
        notLoadedModels.push(currentModelName);
      }
    }
    return notLoadedModels;
  }

  loadModels(models=[], callback=null) {
    let promises = [];

    for (let modelIndex in models) {
      let currentModelName = models[modelIndex];
      promises.push(this.models[currentModelName].load());
    }

    Promise.all(promises)
    .then((results) => {
      for (let modelIndex in models) {
        let currentModelName = models[modelIndex];
        this.modelsStatuses[currentModelName] = true;
      }

      for (let resultIndex in results) {
        let currentResult = results[resultIndex];
        errors.addPortion(currentResult.errors);
      }
      errors.send();

      if (callback !== null) {
        callback();
      }
    });
  }
}

let modelsLoader = new ModelsLoader();
modelsLoader.registerModel('documents', documents);
modelsLoader.registerModel('folders', folders);
modelsLoader.registerModel('fillRequests', fillRequests);

export default modelsLoader;
