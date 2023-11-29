class LiveTimer extends HTMLElement {
  #timer;
  #timerID;

  render() {
    this.#timer = document.createElement("time-formatted");

    this.#timer.setAttribute("hour", "numeric");
    this.#timer.setAttribute("minute", "numeric");
    this.#timer.setAttribute("second", "numeric");

    this.append(this.#timer);
  }

  update() {
    const date = new Date();
    this.#timer.setAttribute("datetime", date);
    this.dispatchEvent(new CustomEvent("tick", { detail: date }));
  }

  connectedCallback() {
    this.render();
    this.#timerID = setInterval(() => this.update(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this.#timerID);
  }
}

customElements.define("live-timer", LiveTimer);
