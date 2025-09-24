import React, { useEffect, useRef } from "react";
import image1 from "/src/assets/images/d1.webp";

export default function ContentSections() {
  const contentRef = useRef(null);
  const section1 = (
    <section>
      <h1 className="bb7">
        <a
          className="loadicon010101"
          href="https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment"
          target="_parent"
          rel="noreferrer"
        >
          12 ways you can protect the environment
        </a>
      </h1>
      <img
        className="iiim"
        src="https://fouadbechar.x10.mx/p/m/enrg.webp"
        alt="image"
        width={400}
        height={224}
      />
      <p className="b3">
        We are all consumers — what we buy, how much we consume and how often.
        Whether it’s gas, food, clothing, cars, furniture, water, toys,
        electronics or knick-knacks, we are all consumers. The key is not to
        stop consuming but to start being mindful of our consumption habits and
        how each purchase or action affects the ecosystem. Small changes can
        make a big difference.
      </p>
    </section>
  );

  const section2 = (
    <section>
      <h2 className="bb7">
        <a
          className="loadicon010101"
          href="https://www.un.org/en/climatechange/raising-ambition/renewable-energy"
          target="_parent"
          rel="noreferrer"
        >
          Renewable energy
        </a>
      </h2>
      <img
        className="iiim"
        src="https://fouadbechar.x10.mx/p/m/enrg.webp"
        alt="image"
        width={400}
        height={224}
      />
      <p className="b3">
        Renewable energy is energy derived from natural sources that are
        replenished at a higher rate than they are consumed. Sunlight and wind
        are examples of renewable sources that are constantly replenished.
      </p>
    </section>
  );

  const section3 = (
    <>
      <section>
        <h1 className="bb7">
          <a
            className="loadicon010101"
            href="https://www.aroundrobin.com/importance-of-social-justice/"
            target="_parent"
            rel="noreferrer"
          >
            The importance of social justice
          </a>
        </h1>
        <img
          className="iim"
          src="https://fouadbechar.x10.mx/p/m/image5.webp"
          alt="image"
          width={300}
          height={192}
        />
        <p className="b3">
          We are living in an era of contradictions. Social justice may be a
          powerful way to address inequality and heal communities.
        </p>
      </section>

      <section>
        <h2 className="bb7 animate0110">
          <a
            className="loadicon010101"
            href="https://womenshealth.gov/relationships-and-safety/domestic-violence/effects-domestic-violence-children"
            target="_parent"
            rel="noreferrer"
          >
            Effects of domestic violence on children
          </a>
        </h2>
        <img
          className="iim animate0110"
          src="https://fouadbechar.x10.mx/p/m/image06.webp"
          alt="image"
          width={300}
          height={200}
        />
        <p className="b3 animate0110">
          Children exposed to violence may face long-term physical and mental
          health issues. Support and early intervention are critical.
        </p>
      </section>
    </>
  );

  const section4 = (
    <>
      <section>
        <h1 className="bb7">
          <a
            className="loadicon010101"
            href="https://riseservicesinc.org/news/5-stages-child-development/#:~:text=Other%20scholars%20describe%20six%20stages,%2C%20school%20age%2C%20and%20adolescents."
            target="_parent"
            rel="noreferrer"
          >
            What are the 5 stages of child development
          </a>
        </h1>
        <img
          className="iim"
          src="https://fouadbechar.x10.mx/p/m/image7.webp"
          alt="image"
          width={300}
          height={142}
        />
        <p className="b3">
          Child development often occurs in stages; understanding those stages
          helps caregivers support growth.
        </p>
      </section>

      <section>
        <h2 className="bb7 animate0110">
          <a
            className="loadicon010101"
            href="https://caringforkids.cps.ca/handouts/mentalhealth/mental_health"
            target="_parent"
            rel="noreferrer"
          >
            Your child’s mental health
          </a>
        </h2>
        <img
          className="iim animate0110"
          src="https://fouadbechar.x10.mx/p/m/image8.webp"
          alt="image"
          width={300}
          height={200}
        />
        <p className="b3 animate0110">
          Mental health affects the way people think, feel and act. Taking care
          of our mental health is just as important as having a healthy body.
        </p>
      </section>
    </>
  );

  const section5 = (
    <>
      <a
        className="loadicon010101"
        href="https://a.co/d/b9zan5D"
        target="_parent"
        rel="noreferrer"
      >
        <img
          src="https://fouadbechar.x10.mx/p/m/book.webp"
          alt="Description of Image"
          className="image208 animate0110"
          width={100}
          height={160}
        />
      </a>
      <div className="text208 animate0110">
        <h2 className="h208">
          <a
            className="loadicon010101"
            href="https://a.co/d/b9zan5D"
            target="_parent"
            rel="noreferrer"
          >
            Quantum computing
          </a>
        </h2>
        <p className="p208">A short book about quantum computing.</p>
      </div>
    </>
  );

  const section6 = (
    <section>
      <h2 className="bb7 animate0110">
        <a
          className="loadicon010101"
          href="https://x10hosting.com/"
          target="_parent"
          rel="noreferrer"
        >
          Free Web hosting
        </a>
      </h2>
      <img
        className="iiim0 animate0110"
        src="https://fouadbechar.x10.mx/p/m/x10.webp"
        alt="image"
        width={400}
        height={100}
      />
      <p className="b3 animate0110">
        10+ Years Industry Veteran We've been around for a long time and we're
        here to stay. Rest assured that we know how to provide a stable,
        high-performance web hosting service that isn't going to close
        overnight. We believe that hosting should be accessible to all.
      </p>
    </section>
  );

  const section7 = (
    <>
      <section>
        <h2 className="bb7">
          <a
            className="loadicon010101"
            href="https://youtu.be/nWkAatonIdk"
            target="_parent"
            rel="noreferrer"
          >
            Artificial Intelligence
          </a>
        </h2>
        <a
          className="loadicon010101"
          href="https://youtu.be/nWkAatonIdk"
          target="_parent"
          rel="noreferrer"
        >
          <img
            className="iiim"
            src="https://fouadbechar.x10.mx/p/m/AI.webp"
            alt="image"
            width={400}
            height={224}
          />
        </a>
        <div className="container010101 loadicon010101">
          <h2 className="h2010101">Defining Artificial Intelligence</h2>
          <p className="p010101">
            Artificial intelligence (AI) is a broad field of computer science
            that aims to create systems capable of performing tasks that
            typically require human intelligence.
          </p>
        </div>
      </section>
    </>
  );

  const section8 = (
    <>
      <div className="mySlides fade">
        <div className="numbertext">1 / 3</div>
        <img
          className="imgslideshow"
          src="https://fouadbechar.x10.mx/p/m/image1ss.webp"
          alt="image"
        />
        <div className="text">
          <p>
            <a
              className="i0i2 loadicon010101"
              href="https://breathingtravel.com/best-islands-to-visit-in-indonesia/"
              target="_parent"
              rel="noreferrer"
            >
              Bali Island
            </a>
            is one of the most beautiful tourist places in Indonesia.
          </p>
        </div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">2 / 3</div>
        <img
          className="imgslideshow"
          src="https://fouadbechar.x10.mx/p/m/image2ss.webp"
          alt="image"
        />
        <div className="text">
          <p>
            <a
              className="i0i2 loadicon010101"
              href="https://www.tripadvisor.fr/Tourism-g298566-Osaka_Osaka_Prefecture_Kinki-Vacations.html"
              target="_parent"
              rel="noreferrer"
            >
              Osaka
            </a>
            the second largest and richest city in Japan.
          </p>
        </div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">3 / 3</div>
        <img
          className="imgslideshow"
          src="https://fouadbechar.x10.mx/p/m/image3ss.webp"
          alt="image"
        />
        <div className="text">
          <p>
            <a
              className="i0i2 loadicon010101"
              href="https://www.routard.com/guide/code_dest/new_york.htm"
              target="_parent"
              rel="noreferrer"
            >
              New York
            </a>
            is famous for its world-renowned shopping and fine restaurants.
          </p>
        </div>
      </div>

      <span className="prev"> &lt; </span>
      <span className="next"> &gt; </span>
    </>
  );

  const section9 = (
    <>
      <span
        className="dot"
        onClick={() => window.currentSlide && window.currentSlide(1)}
      />
      <span
        className="dot"
        onClick={() => window.currentSlide && window.currentSlide(2)}
      />
      <span
        className="dot"
        onClick={() => window.currentSlide && window.currentSlide(3)}
      />
    </>
  );

  const section10 = (
    <>
      <div className="ai-card">
        <img
          src="https://fouadbechar.x10.mx/p/m/gpt01.webp"
          alt="ChatGPT Logo"
          width={50}
          height={50}
        />
        <h3>ChatGPT</h3>
        <p>Smart assistant for programming, writing, and imaginative ideas.</p>
        <a href="https://chat.openai.com/" target="_parent" rel="noreferrer">
          Try it now
        </a>
      </div>
      <div className="ai-card">
        <img
          src="https://fouadbechar.x10.mx/p/m/gemini01.webp"
          alt="Gemini Logo"
          width={50}
          height={50}
        />
        <h3>Gemini</h3>
        <p>
          Artificial intelligence for creativity, search, and images from
          Google.
        </p>
        <a href="https://gemini.google.com/" target="_parent" rel="noreferrer">
          Try it now
        </a>
      </div>
      <div className="ai-card">
        <img
          src="https://fouadbechar.x10.mx/p/m/copilot01.webp"
          alt="Copilot Logo"
          width={50}
          height={50}
        />
        <h3>Copilot</h3>
        <p>Intelligent assistant in Windows and Office, from Microsoft.</p>
        <a
          href="https://copilot.microsoft.com/"
          target="_parent"
          rel="noreferrer"
        >
          Try it now
        </a>
      </div>
    </>
  );

  const section11 = (
    <div className="social-center">
      <span>
        <a
          className="loadicon010101"
          href="https://www.facebook.com/FouadBechar2"
          target="_parent"
          rel="noreferrer"
        >
          <img
            className="img321"
            src="https://fouadbechar.x10.mx/p/m/image0104.webp"
            alt="image0102"
            width={30}
            height={30}
          />
        </a>
        <a
          className="loadicon010101"
          href="https://x.com/FouadBechar"
          target="_parent"
          rel="noreferrer"
        >
          <img
            className="im0im1"
            src="https://fouadbechar.x10.mx/p/m/image0105.webp"
            alt="image0105"
            width={30}
            height={30}
          />
        </a>
        <a
          className="loadicon010101"
          href="https://www.youtube.com/channel/UCi3RVanUvgW2o1Ld5lt7EjA"
          target="_parent"
          rel="noreferrer"
        >
          <img
            className="im0im2"
            src="https://fouadbechar.x10.mx/p/m/youtb.webp"
            alt="image0105"
            width={43}
            height={30}
          />
        </a>
        <img
          id="open-btn"
          src="https://fouadbechar.x10.mx/p/m/ml.webp"
          alt="email"
          width={30}
          height={30}
        />
      </span>
      <div className="pr0101">
        <a href="p/v/pr" target="_parent">
          Privacy Policy
        </a>
      </div>
    </div>
  );

  useEffect(() => {
    const messages = {
      ar: {
        text: "يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك.",
        accept: "أوافق",
        decline: "أرفض",
      },
      en: {
        text: "This site uses cookies to enhance your experience.",
        accept: "Accept",
        decline: "Decline",
      },
    };

    const lang =
      document.documentElement.lang &&
      document.documentElement.lang.startsWith("ar")
        ? "ar"
        : "en";
    const cookieConsent = document.getElementById("cookie-consent");
    const msg = messages[lang];

    if (document.getElementById("cookie-message")) {
      document.getElementById("cookie-message").textContent = msg.text;
    }
    if (document.getElementById("accept")) {
      document.getElementById("accept").textContent = msg.accept;
    }
    if (document.getElementById("decline")) {
      document.getElementById("decline").textContent = msg.decline;
    }

    function getCookie(name) {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
    }

    function setCookie(name, value, days) {
      const maxAge = days * 24 * 60 * 60;
      document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax; Secure`;
    }

    if (cookieConsent && !getCookie("consent")) {
      cookieConsent.style.display = "block";
      cookieConsent.classList.add("show2");
    }

    const acceptBtn = document.getElementById("accept");
    const declineBtn = document.getElementById("decline");
    if (acceptBtn) {
      const onAccept = () => {
        setCookie("consent", "accepted", 30);
        closeConsent();
      };
      acceptBtn.addEventListener("click", onAccept);
    }
    if (declineBtn) {
      const onDecline = () => {
        setCookie("consent", "declined", 30);
        closeConsent();
      };
      declineBtn.addEventListener("click", onDecline);
    }

    function closeConsent() {
      if (cookieConsent) {
        cookieConsent.classList.remove("show2");
        cookieConsent.classList.add("hide");
        setTimeout(() => cookieConsent.remove(), 500);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", function () {
      const elements = document.querySelectorAll(".animate0110");
      const windowHeight = window.innerHeight;

      elements.forEach((element) => {
        const position = element.getBoundingClientRect().top;

        if (position < windowHeight) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    });
  }, []);

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

      <div className="wrapper010" />
      <div className="open01">
        <img
          className="grid1img"
          src={image1}
          width="200px"
          height="133px"
          alt="image"
        />
      </div>

      <div className="wrapper">
        <video className="vividd" src="" preload="auto" controls autoPlay />
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
        <div id="text1" className="ff13">
          {section1}
        </div>
        <div id="text2" className="ff14">
          {section2}
        </div>
      </div>

      <div className="f13">
        <div id="text3" className="ff13 animate0110">
          {section3}
        </div>
        <div id="text4" className="ff14 animate0110">
          {section4}
        </div>
      </div>

      <div id="text5" className="container208 animate0110">
        {section5}
      </div>

      <div className="f113">
        <div id="text6" className="ff113 animate0110">
          {section6}
        </div>
      </div>

      <div className="f113">
        <div id="text7" className="ff113 animate0110">
          {section7}
        </div>
      </div>

      <div id="text8" className="slideshow-container animate0110">
        {section8}
      </div>

      <div id="text9" className="animate0110" style={{ textAlign: "center" }}>
        {section9}
      </div>

      <div id="text10" className="ai-card-grid">
        {section10}
      </div>

      <div id="cookie-consent" role="dialog" aria-live="polite">
        <p id="cookie-message"></p>
        <div style={{ textAlign: "center" }}>
          <button type="button" id="accept" title="accept"></button>
          <button type="button" id="decline" title="decline"></button>
        </div>
      </div>

      <div className="social-row">{section11}</div>

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
            <img
              className="img707"
              src="/src/assets/images/icons03.svg"
              alt="icons03"
            />
          </span>
          <button id="clear-btn" title="Clear Chat">
            <img
              className="img708"
              src="/src/assets/images/icons1.svg"
              alt="icons1"
            />
          </button>
          <button id="close-btn" title="Close">
            <img
              className="img709"
              src="/src/assets/images/icons2.svg"
              alt="icons2"
            />
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
              style={{
                width: "1em",
                height: "1em",
                verticalAlign: "middle",
                fill: "currentColor",
                overflow: "hidden",
              }}
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
                style={{ mixBlendMode: "normal" }}
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
