import React, { useEffect } from "react";
import ChatWidget from "./ChatWidget";
import Slideshow from "./Slideshow";
import image1 from "/src/assets/images/d1.webp";
import enrg from "/src/assets/images/enrg.webp";
import image4 from "/src/assets/images/image4.webp";
import image5 from "/src/assets/images/image5.webp";
import image06 from "/src/assets/images/image06.webp";
import image7 from "/src/assets/images/image7.webp";
import image8 from "/src/assets/images/image8.webp";
import book from "/src/assets/images/book.webp";
import x10 from "/src/assets/images/x10.webp";
import image1ss from "/src/assets/images/image1ss.webp";
import image2ss from "/src/assets/images/image2ss.webp";
import image3ss from "/src/assets/images/image3ss.webp";
import gpt01 from "/src/assets/images/gpt01.webp";
import gemini01 from "/src/assets/images/gemini01.webp";
import copilot01 from "/src/assets/images/copilot01.webp";
// import icon from "/src/assets/images/chat-icon.png";
import AI from "/src/assets/images/AI.webp";
// import icons2 from "/src/assets/images/icons2.svg";
// import icons1 from "/src/assets/images/icons1.svg";
// import icons03 from "/src/assets/images/icons03.svg";

export default function ContentSections() {
  const section1 = (
    <>
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
          src={image4}
          alt="image"
          width={400}
          height={224}
        />
        <p className="b3">
          Most of the damage to our environment stems from consumption: what we
          consume, how much we consume and how often. Whether it’s gas,food,
          clothing, cars, furniture, water, toys, electronics, knick-knacks or
          other goods, we are all consumers. The key is not to stop consuming,
          but to start being mindful of our consumption habits and how each
          purchase or action affects the ecosystem. The good news is that it’s
          often not too difficult, expensive, or inconvenient to become more
          environmentally friendly. It can even be a fun challenge to implement
          among your family or coworkers. And though small changes at the
          individual level may seem trivial, just think how much cleaner the
          planet would be If everyone adopts behavior modification.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment"
              target="_parent"
            >
              (continued..)
            </a>
          </i>
        </p>
      </section>
    </>
  );

  const section2 = (
    <>
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
        <img className="iiim" src={enrg} alt="image" width={400} height={224} />
        <p className="b3">
          Renewable energy is energy derived from natural sources that are
          replenished at a higher rate than they are consumed. Sunlight and
          wind, for example, are such sources that are constantly being
          replenished. Renewable energy sources are plentiful and all around us.
          Fossil fuels - coal, oil and gas - on the other hand, are
          non-renewable resources that take hundreds of millions of years to
          form. Fossil fuels, when burned to produce energy, cause harmful
          greenhouse gas emissions, such as carbon dioxide. Generating renewable
          energy creates far lower emissions than burning fossil fuels.
          Transitioning from fossil fuels, which currently account for the
          lion’s share of emissions, to renewable energy is key to addressing
          the climate crisis. Renewables are now cheaper in most countries, and
          generate three times more jobs than fossil fuels.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://www.un.org/en/climatechange/raising-ambition/renewable-energy"
              target="_parent"
            >
              {" "}
              (continued..){" "}
            </a>
          </i>
        </p>
      </section>
    </>
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
          src={image5}
          alt="image"
          width={300}
          height={192}
        />
        <p className="b3">
          We are living in an era of contradictions. While we should focus on
          building a unified approach towards fighting a global pandemic, we are
          more divided than ever. We are more connected than ever before in
          human history, yet are unable to understand the plight of others. We
          see an evolution of human rights, but see no end to conflict. We are
          more willing to accept differences, yet discrimination is on the rise.
          We are living in an era where we have greater freedoms than ever
          before, yet we see no end to injustice. So where do we go from here?
          Is there a way to heal the world? Social justice may be the answer.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://www.aroundrobin.com/importance-of-social-justice/"
              target="_parent"
            >
              (continued..)
            </a>
          </i>
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
          src={image06}
          alt="image"
          width={300}
          height={200}
        />
        <p className="b3 animate0110">
          Many children exposed to violence in the home are also victims of
          physical abuse.One: Children who witness domestic violence or are
          victims of abuse themselves are at serious risk for long-term physical
          and mental health problems.two: Children who witness violence between
          parents may also be at greater risk of being violent in their future
          relationships. If you are a parent who is experiencing abuse, it can
          be difficult to know how to protect your child.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://womenshealth.gov/relationships-and-safety/domestic-violence/effects-domestic-violence-children"
              target="_parent"
            >
              {" "}
              (continued..){" "}
            </a>
          </i>
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
          src={image7}
          alt="image"
          width={300}
          height={142}
        />
        <p className="b3">
          Children change rapidly as they grow. Many of these changes are
          physical. Other changes are cognitive, which means the changes affect
          the way children think and learn. Child development often occurs in
          stages, with the majority of children hitting specific developmental
          landmarks by the time they reach a certain age.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://riseservicesinc.org/news/5-stages-child-development/#:~:text=Other%20scholars%20describe%20six%20stages,%2C%20school%20age%2C%20and%20adolescents."
              target="_parent"
            >
              (continued..)
            </a>
          </i>
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
          src={image8}
          alt="image"
          width={300}
          height={200}
        />
        <p className="b3 animate0110">
          Mental health affects the way people think, feel and act. Taking care
          of our mental health is just as important as having a healthy body. As
          a parent, you play an important role in your child's mental health.
          You can promote good mental health by the things you say and do, and
          through the environment you create at home. You can also learn about
          the early signs of mental health problems and know where to go for
          help.
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://caringforkids.cps.ca/handouts/mentalhealth/mental_health"
              target="_parent"
            >
              (continued..)
            </a>
          </i>
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
          src={book}
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
    <>
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
          src={x10}
          alt="image"
          width={400}
          height={100}
        />
        <p className="b3 animate0110">
          10+ Years Industry Veteran We've been around for a long time and we're
          here to stay. Rest assured that we know how to provide a stable,
          high-performance web hosting service that isn't going to close
          overnight. We believe that hosting should be accessible to all, and
          that's precisely why we offer free hosting for everyone. We even give
          you unmetered bandwidth and disk space? allowing your site to grow
          without fear of ridiculously low limits like our other free hosting
          competitors! You won't find many companies doing that free of charge.
          <i>to visit the official website click here</i>
          <i className="i0i1">
            <a
              className="loadicon010101"
              href="https://x10hosting.com/"
              title="https://x10hosting.com/"
              target="_parent"
            >
              x10hosting
            </a>
          </i>
        </p>
      </section>
    </>
  );

  const section7 = (
    <>
      <section>
        {" "}
        <h2 className="bb7">
          {" "}
          <a
            className="loadicon010101"
            href="https://youtu.be/nWkAatonIdk"
            target="_parent"
          >
            {" "}
            Artificial Intelligence{" "}
          </a>{" "}
        </h2>{" "}
        <a
          className="loadicon010101"
          href="https://youtu.be/nWkAatonIdk"
          target="_parent"
        >
          {" "}
          <img
            className="iiim"
            src={AI}
            alt="image"
            width="400px"
            height="224px"
          />{" "}
        </a>{" "}
        <div className="container010101 loadicon010101">
          {" "}
          <h2 className="h2010101"> Defining Artificial Intelligence </h2>{" "}
          <p className="p010101">
            {" "}
            Artificial intelligence (AI) is a broad field of computer science
            that aims to create systems capable of performing tasks that
            typically require human intelligence. This includes activities like:{" "}
          </p>{" "}
          <ul className="ul010101">
            {" "}
            <li>
              {" "}
              <strong> Learning: </strong> Acquiring new information and rules
              for using it.
            </li>{" "}
            <li>
              {" "}
              <strong> Reasoning: </strong> Using rules to reach approximate or
              definite conclusions.
            </li>{" "}
            <li>
              {" "}
              <strong> Problem-solving: </strong> Finding solutions to complex
              challenges.{" "}
            </li>{" "}
            <li>
              {" "}
              <strong> Perception: </strong> Interpreting sensory information
              (like images or sound).{" "}
            </li>{" "}
            <li>
              {" "}
              <strong> Natural language understanding: </strong> Communicating
              and interacting with humans through language.{" "}
            </li>{" "}
          </ul>{" "}
          <h2 className="h20101012"> Key Concepts in AI </h2>{" "}
          <ul className="ul010101">
            <li>
              <strong>Machine Learning:</strong>A subset of AI that focuses on
              algorithms that allow computers to learn from data without
              explicit programming. This includes techniques like:
              <ul>
                <li>
                  <strong>Supervised learning:</strong>Training models on
                  labeled data (e.g., classifying images).
                </li>
                <li>
                  <strong>Unsupervised learning:</strong>Finding patterns and
                  structures in unlabeled data (e.g., customer segmentation).
                </li>
                <li>
                  <strong>Reinforcement learning:</strong>Training agents to
                  make decisions by rewarding desired behaviors.
                </li>
              </ul>
            </li>
            <li>
              <strong>Deep Learning: </strong>A type of machine learning that
              uses artificial neural networks with multiple layers to analyze
              complex patterns in data. Deep learning has revolutionized fields
              like image recognition, natural language processing, and speech
              recognition.
            </li>
            <li>
              <strong>Natural Language Processing (NLP):</strong>The ability of
              computers to understand, interpret, and generate human language.
              This includes tasks like:
              <ul>
                <li>
                  <strong>Translation:</strong>Converting text from one language
                  to another.
                </li>
                <li>
                  <strong>Sentiment analysis:</strong>Determining the emotional
                  tone of text.
                </li>
                <li>
                  <strong>Chatbots:</strong>Interacting with users through
                  conversation.
                </li>
              </ul>
            </li>
          </ul>
          <h2 className="h20101012">Applications of AI</h2>
          <p className="p010101">AI is rapidly transforming various sectors:</p>
          <ul className="ul010101">
            <li>
              <strong>Healthcare:</strong>Diagnosing diseases, developing new
              drugs, personalizing treatment plans.
            </li>
            <li>
              <strong>Finance:</strong>Fraud detection, algorithmic trading,
              credit scoring.
            </li>
            <li>
              <strong>Transportation:</strong>Self-driving cars, traffic
              optimization, logistics.
            </li>
            <li>
              <strong>Customer service:</strong>Chatbots, virtual assistants,
              personalized recommendations.
            </li>
            <li>
              <strong>Entertainment:</strong>Game development, content creation,
              personalized streaming.
            </li>
          </ul>
          <h2 className="h20101012 animate0110">The Future of AI</h2>
          <p className="p010101">
            AI is an evolving field with significant potential. Continued
            research and development will likely lead to even more sophisticated
            AI systems with broader applications. However, it's crucial to
            address ethical considerations, such as bias, job displacement, and
            the responsible use of AI.{" "}
          </p>{" "}
        </div>{" "}
      </section>
    </>
  );

  // const section8 = (
  //   <>
  //     <div className="mySlides fade">
  //       <div className="numbertext">1 / 3</div>
  //       <img className="imgslideshow" src={image1ss} alt="image" />
  //       <div className="text">
  //         <p>
  //           <a
  //             className="i0i2 loadicon010101"
  //             href="https://breathingtravel.com/best-islands-to-visit-in-indonesia/"
  //             target="_parent"
  //             rel="noreferrer"
  //           >
  //             Bali Island
  //           </a>
  //           is one of the most beautiful tourist places in Indonesia, because of
  //           its rich natural beauty and ancient history and heritage that makes
  //           it one of the best cities in the world.
  //         </p>
  //       </div>
  //     </div>

  //     <div className="mySlides fade">
  //       <div className="numbertext">2 / 3</div>
  //       <img className="imgslideshow" src={image2ss} alt="image" />
  //       <div className="text">
  //         <p>
  //           <a
  //             className="i0i2 loadicon010101"
  //             href="https://www.tripadvisor.fr/Tourism-g298566-Osaka_Osaka_Prefecture_Kinki-Vacations.html"
  //             target="_parent"
  //             rel="noreferrer"
  //           >
  //             Osaka
  //           </a>
  //           the second largest and richest city in Japan, and one of the most
  //           beautiful tourism cities in Japan and in the world as a whole, due
  //           to its long history that extends back to before the 16th century.
  //         </p>
  //       </div>
  //     </div>

  //     <div className="mySlides fade">
  //       <div className="numbertext">3 / 3</div>
  //       <img className="imgslideshow" src={image3ss} alt="image" />
  //       <div className="text">
  //         <p>
  //           <a
  //             className="i0i2 loadicon010101"
  //             href="https://www.routard.com/guide/code_dest/new_york.htm"
  //             target="_parent"
  //             rel="noreferrer"
  //           >
  //             New York
  //           </a>
  //           is famous for its world-renowned shopping and fine restaurants
  //           around the most important tourist places such as the Statue of
  //           Liberty, its historical neighborhoods and museums.
  //         </p>
  //       </div>
  //     </div>

  //     <span className="prev"> &lt; </span>
  //     <span className="next"> &gt; </span>
  //   </>
  // );

  // const section9 = (
  //   <>
  //     <span
  //       className="dot"
  //       onClick={() => window.currentSlide && window.currentSlide(1)}
  //     />
  //     <span
  //       className="dot"
  //       onClick={() => window.currentSlide && window.currentSlide(2)}
  //     />
  //     <span
  //       className="dot"
  //       onClick={() => window.currentSlide && window.currentSlide(3)}
  //     />
  //   </>
  // );

  const section10 = (
    <>
      <div className="ai-card">
        <img src={gpt01} alt="ChatGPT Logo" width={50} height={50} />
        <h3>ChatGPT</h3>
        <p>Smart assistant for programming, writing, and imaginative ideas.</p>
        <a href="https://chat.openai.com/" target="_parent" rel="noreferrer">
          Try it now
        </a>
      </div>
      <div className="ai-card">
        <img src={gemini01} alt="Gemini Logo" width={50} height={50} />
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
        <img src={copilot01} alt="Copilot Logo" width={50} height={50} />
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
    let onAccept = null;
    let onDecline = null;
    if (acceptBtn) {
      onAccept = () => {
        setCookie("consent", "accepted", 30);
        closeConsent();
      };
      acceptBtn.addEventListener("click", onAccept);
    }
    if (declineBtn) {
      onDecline = () => {
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

    return () => {
      try {
        if (acceptBtn && onAccept)
          acceptBtn.removeEventListener("click", onAccept);
      } catch (e) {}
      try {
        if (declineBtn && onDecline)
          declineBtn.removeEventListener("click", onDecline);
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    
    const selector = ".animate0110";

    function applyVisibleStyles(el) {
      try {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      } catch (e) {
        // ignore styling errors
      }
    }

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              applyVisibleStyles(entry.target);
              // If you only want the animation once, unobserve after first intersection
              try {
                obs.unobserve(entry.target);
              } catch (e) {}
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.05 }
      );

      // Observe existing elements
      try {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => observer.observe(el));
      } catch (e) {}

      return () => {
        try {
          observer.disconnect();
        } catch (e) {}
      };
    } else {
      // Fallback for older browsers
      function onScroll() {
        const elements = document.querySelectorAll(selector);
        const windowHeight = window.innerHeight;

        elements.forEach((element) => {
          const position = element.getBoundingClientRect().top;

          if (position < windowHeight) {
            applyVisibleStyles(element);
          }
        });
      }

      document.addEventListener("scroll", onScroll);
      // run once to catch already visible elements
      onScroll();

      return () => {
        try {
          document.removeEventListener("scroll", onScroll);
        } catch (e) {}
      };
    }
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

      {/* <div className="wrapper010" />
      <div className="open01">
        <img
          className="grid1img"
          src={image1}
          width="200px"
          height="133px"
          alt="image"
        />
      </div> */}

      {/* <div className="wrapper">
        <video className="vividd" src="" preload="auto" controls autoPlay />
        <div className="close">
          <a href="https://www.worldwildlife.org/" target="_parent">
            <button type="button" className="lien">
              WWF
            </button>
          </a>
          <button>Close</button>
        </div>
      </div> */}

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

      {/* <div id="text8" className="slideshow-container animate0110">
        {section8}
      </div>

      <div id="text9" className="animate0110" style={{ textAlign: "center" }}>
        {section9}
      </div> */}

       <Slideshow />

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
   
      <ChatWidget />
   
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
