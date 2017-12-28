class Errors {
  constructor() {
    this.errors = [];
  }

  addPortion(errors) {
    for (let errorIndex in errors) {
      let currentError = errors[errorIndex];
      this.errors.push(currentError);
    }
  }

  send() {
    if (this.errors.length === 0) {
      return;
    }
    google.script.run
      .withSuccessHandler(() => {this.errors = [];})
      .ccErrors(this.errors);
  }
}

export default new Errors();
