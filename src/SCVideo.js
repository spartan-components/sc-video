const html = String.raw;

class SCVideo extends HTMLElement {
  constructor() {
    super();

    // data refs
    this._title = this.dataset.title;
    this.provider = this.dataset.provider;
    this.vid = this.dataset.id;

    // computed refs
    this.key = `${this.provider}CookiesAccepted`;

    // element refs
    this.backdrop = this.querySelector("[data-backdrop]");
    this.content = this.querySelector("[data-content]");
    this.disclaimer = null;
    this.okbutton = null;
    this.playbutton = null;
    this.tmplDisclaimer = this.querySelector("template[data-disclaimer]");
    this.tmplPlaybutton = this.querySelector("template[data-playbutton]");

    // setup event listener
    this.addEventListener("click", this);

    // initial render
    this.init();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this);
  }

  init() {
    // replace fallback with playbutton
    this.content.innerHTML = this.tmplPlaybutton.innerHTML;
    this.playbutton = this.content.querySelector("button");
  }

  renderIframe() {
    const templates = {
      youtube: html`<iframe
        title="${this._title ?? ""}"
        frameborder="0"
        src="https://www.youtube-nocookie.com/embed/${this.vid}?autoplay=1"
        allow="accelerometer autoplay encrypted-media gyroscope picture-in-picture"
        allowfullscreen
      >
      </iframe>`,
      vimeo: html`<iframe
        title="${this._title ?? ""}"
        frameborder="0"
        src="https://player.vimeo.com/video/${this.id}?autoplay=1"
        allow="autoplay fullscreen"
        allowfullscreen
      >
      </iframe>`,
    };

    this.content.innerHTML = templates[this.provider];
  }

  renderDisclaimer() {
    // replace content with disclaimer
    this.content.innerHTML = this.tmplDisclaimer.innerHTML;
    this.okbutton = this.content.querySelector("button");
  }

  handleEvent(event) {
    const playRequest = event.target === this.playbutton;
    const cookiesAccepted = localStorage.getItem(this.key) === "true";

    // playback requested and cookies already accepted
    if (playRequest && cookiesAccepted) this.renderIframe();

    // playback requested but cookies not already accepted
    if (playRequest && !cookiesAccepted) this.renderDisclaimer();

    // cookies accepted button clicked
    if (event.target === this.okbutton) {
      // save choice
      localStorage.setItem(this.key, "true");
      // render
      this.renderIframe();
    }
  }
}

export default SCVideo;
