import documents from './documents';
import folders from './folders';

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
    .then((result) => {
      for (let modelIndex in models) {
        let currentModelName = models[modelIndex];
        this.modelsStatuses[currentModelName] = true;
      }

      if (callback !== null) {
        callback();
      }
    });
  }
}

let modelsLoader = new ModelsLoader();
modelsLoader.registerModel('documents', documents);
modelsLoader.registerModel('folders', folders);

export default modelsLoader;
