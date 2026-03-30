class SharedState {
  constructor(initialValue) {
    this.value = initialValue;
    this.setters = [];
  }

  subscribe(setter) {
    console.log("[SharedState] subscribing... ");

    if (!this.setters.includes(setter)) {
      this.setters.push(setter);
    }
    setter(this.value);
    return () => this.unsubscribe(setter);
  }

  unsubscribe(setter) {
    console.log("[SharedState] unsubscribing... ");

    this.setters = this.setters.filter((item) => item !== setter);
  }

  publish(newValue) {
    console.log("[SharedState] publishing... ", newValue);
    this.value = newValue;
    this.setters.forEach((setter) => {
      setter(newValue);
    });
  }

  get() {
    return this.value;
  }
}

export default SharedState;
