import React from "react";

export default function ContentSections() {
  return (
    <main>
      <div className="overlay" id="overlay" aria-hidden="true"></div>

      <div id="loading-icon010101" className="hidden010101">
        <div className="loader010"></div>
      </div>

      <div id="loadingSpinner1">
        <div className="loader010"></div>
      </div>

      <div id="loadingIcon01010">
        <div className="loader010"></div>
      </div>

      <div className="wrapper010"></div>
      <div className="open01">
        <img
          className="grid1img"
          src="/src/assets/images/d1.webp"
          width="200px"
          height="133px"
          alt="image"
        />
      </div>

      <div className="wrapper">
        <video
          className="vividd"
          src=""
          preload="auto"
          controls
          autoPlay
        ></video>
        <div className="close">
          <a href="https://www.worldwildlife.org/" target="_parent">
            <button type="button" className="lien">
              WWF
            </button>
          </a>
          <button>Close</button>
        </div>
      </div>

      <div className="container">
        <div className="text1">
          <a
            className="b6"
            href="https://www.worldwildlife.org/"
            target="_parent"
          >
            World Wide Fund for Nature
          </a>

          <span id="p010101" className="p1">
            {" "}
          </span>
        </div>
      </div>
      <div className="f13">
        <div id="text1" className="ff13"></div>
        <div id="text2" className="ff14"></div>
      </div>

      <div className="f13">
        <div id="text3" className="ff13 animate0110"></div>
        <div id="text4" className="ff14 animate0110"></div>
      </div>
      <div id="text5" className="container208 animate0110"></div>

      <div className="f113">
        <div id="text6" className="ff113 animate0110"></div>
      </div>

      <div className="f113">
        <div id="text7" className="ff113 animate0110"></div>
      </div>

      <div id="text8" className="slideshow-container animate0110"></div>

  <div id="text9" className="animate0110" style={{ textAlign: 'center' }}></div>

      <div id="text10" className="ai-card-grid"></div>

      <div id="cookie-consent" role="dialog" aria-live="polite">
        <p id="cookie-message"></p>
  <div style={{ textAlign: 'center' }}>
          <button type="button" id="accept" title="accept"></button>
          <button type="button" id="decline" title="decline"></button>
        </div>
      </div>

      <button id="chat-toggle" type="button">
        <img
          src="/src/assets/images/chat-icon.png"
          alt="chat Logo"
          width="50px"
          height="31px"
        />
      </button>

      <div id="chat-box">
        <div id="chat-header">
          <span>
            <img className="img707" src="/src/assets/images/icons03.svg" alt="icons03" />
          </span>
          <button id="clear-btn" title="Clear Chat">
            <img className="img708" src="/src/assets/images/icons1.svg" alt="icons1" />
          </button>
          <button id="close-btn" title="Close">
            <img className="img709" src="/src/assets/images/icons2.svg" alt="icons2" />
          </button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
          />
          <button type="button" id="send-btn" title="send-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon"
              style={{ width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path d="M41.353846 876.307692l86.646154-320.984615h366.276923c9.846154 0 19.692308-9.846154 19.692308-19.692308v-39.384615c0-9.846154-9.846154-19.692308-19.692308-19.692308H128l-84.676923-315.076923C41.353846 157.538462 39.384615 151.630769 39.384615 145.723077c0-13.784615 13.784615-27.569231 29.538462-25.6 3.938462 0 5.907692 1.969231 9.846154 1.969231l886.153846 364.307692c11.815385 3.938462 19.692308 15.753846 19.692308 27.569231s-7.876923 21.661538-17.723077 25.6L78.769231 913.723077c-3.938462 1.969231-7.876923 1.969231-11.815385 1.969231-15.753846-1.969231-27.569231-13.784615-27.569231-29.538462 0-3.938462 0-5.907692 1.969231-9.846154z" />
            </svg>
          </button>
        </div>
      </div>

      <div id="form-container">
        <form
          id="my-form"
          className="animated"
          encType="multipart/form-data"
          method="POST"
        >
          <button type="button" id="close-btn2" title="close-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="22px"
              height="22px"
              fillRule="nonzero"
            >
              <g
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: 'normal' }}
              >
                <g transform="scale(3.55556,3.55556)">
                  <path d="M19,15c-1.023,0 -2.04812,0.39087 -2.82812,1.17188c-1.562,1.562 -1.562,4.09425 0,5.65625l14.17188,14.17188l-14.17187,14.17188c-1.562,1.562 -1.562,4.09425 0,5.65625c0.78,0.78 1.80513,1.17188 2.82813,1.17188c1.023,0 2.04812,-0.39088 2.82813,-1.17187l14.17188,-14.17187l14.17188,14.17188c1.56,1.562 4.09525,1.562 5.65625,0c1.563,-1.563 1.563,-4.09325 0,-5.65625l-14.17187,-14.17187l14.17188,-14.17187c1.562,-1.562 1.562,-4.09425 0,-5.65625c-1.56,-1.561 -4.09625,-1.562 -5.65625,0l-14.17187,14.17188l-14.17187,-14.17187c-0.78,-0.78 -1.80513,-1.17187 -2.82812,-1.17187z" />
                </g>
              </g>
            </svg>
          </button>
          <h2>Contact Form</h2>
          <p id="responseMessage" className="pp00"></p>
          <input
            className="input02"
            type="text"
            name="prenom"
            placeholder="First Name"
            required
          />
          <input
            className="input02"
            type="text"
            name="nom"
            placeholder="Last Name"
            required
          />
          <input
            className="input02"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <textarea
            className="textarea02"
            name="textarea"
            placeholder="Your message"
          ></textarea>
          <input
            className="input002"
            type="file"
            name="file"
            id="file-input"
            placeholder="selet file"
          />
          <div id="file-preview" className="preview"></div>
          <button className="button2" type="submit">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
