import React, {useEffect} from "react";

import image1ss from "/src/assets/images/image1ss.webp";
import image2ss from "/src/assets/images/image2ss.webp";
import image3ss from "/src/assets/images/image3ss.webp";



export default function Slideshow() {

 const section8 = (
   <>
      <div className="mySlides fade">
        <div className="numbertext">1 / 3</div>
        <img className="imgslideshow" src={image1ss} alt="image002" />
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
            is one of the most beautiful tourist places in Indonesia, because of
            its rich natural beauty and ancient history and heritage that makes
            it one of the best cities in the world.
          </p>
        </div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">2 / 3</div>
        <img className="imgslideshow" src={image2ss} alt="image03" />
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
            the second largest and richest city in Japan, and one of the most
            beautiful tourism cities in Japan and in the world as a whole, due
            to its long history that extends back to before the 16th century.
          </p>
        </div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">3 / 3</div>
        <img className="imgslideshow" src={image3ss} alt="image04" />
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
            is famous for its world-renowned shopping and fine restaurants
            around the most important tourist places such as the Statue of
            Liberty, its historical neighborhoods and museums.
          </p>
        </div>
      </div>

  <button type="button" className="prev" aria-label="Previous slide"> &lt; </button>
  <button type="button" className="next" aria-label="Next slide"> &gt; </button>
  </>
  );

  const section9 = (
  <>
      <button type="button" className="dot" onClick={() => window.currentSlide && window.currentSlide(1)} aria-label="Go to slide 1" />
      <button type="button" className="dot" onClick={() => window.currentSlide && window.currentSlide(2)} aria-label="Go to slide 2" />
      <button type="button" className="dot" onClick={() => window.currentSlide && window.currentSlide(3)} aria-label="Go to slide 3" />
  </>
  );

 

  useEffect(() => {

    let slideIndex = 1;
    let slideInterval;
    let isPaused = false;

    function showSlides(n) {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      if (!slides || slides.length === 0) return;
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      if (dots && dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
    }

    function plusSlides(n) {
      if (!isPaused) {
        clearInterval(slideInterval);
        showSlides((slideIndex += n));
        slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
      }
    }

    function currentSlide(n) {
      if (!isPaused) {
        clearInterval(slideInterval);
        showSlides((slideIndex = n));
        slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
      }
    }

    // expose currentSlide to window so existing dot onClick handlers work
    try {
      window.currentSlide = currentSlide;
    } catch (err) { console.debug('Slideshow expose currentSlide error', err); }

    // initialize slideshow immediately (don't rely on DOMContentLoaded)
    showSlides(slideIndex);
    slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);

    // Attach prev/next handlers if elements exist
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const prevHandler = () => plusSlides(-1);
    const nextHandler = () => plusSlides(1);
    if (prevButton) prevButton.addEventListener("click", prevHandler);
    if (nextButton) nextButton.addEventListener("click", nextHandler);

    // Pause on hover
    const slideEls = Array.from(document.querySelectorAll(".mySlides"));
    const hoverHandlers = [];
    slideEls.forEach((el) => {
      const onMouseOver = () => {
        clearInterval(slideInterval);
        isPaused = true;
      };
      const onMouseOut = () => {
        isPaused = false;
        slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
      };
      el.addEventListener("mouseover", onMouseOver);
      el.addEventListener("mouseout", onMouseOut);
      hoverHandlers.push({ el, onMouseOver, onMouseOut });
    });

    return () => {
      // cleanup interval and event listeners
      try {
        clearInterval(slideInterval);
      } catch (err) { console.debug('Slideshow clearInterval error', err); }
      try {
        if (prevButton) prevButton.removeEventListener("click", prevHandler);
      } catch (err) { console.debug('Slideshow prevButton remove error', err); }
      try {
        if (nextButton) nextButton.removeEventListener("click", nextHandler);
      } catch (err) { console.debug('Slideshow nextButton remove error', err); }
      hoverHandlers.forEach(({ el, onMouseOver, onMouseOut }) => {
        try {
          el.removeEventListener("mouseover", onMouseOver);
          el.removeEventListener("mouseout", onMouseOut);
        } catch (err) { console.debug('Slideshow hoverHandlers remove error', err); }
      });
      try {
        // clean window helper
        if (window && window.currentSlide) delete window.currentSlide;
      } catch (err) { console.debug('Slideshow delete window.currentSlide error', err); }
    };

  }, []);
 


  return (
    <>
 
  <div id="text8" className="slideshow-container animate0110">
        {section8}
  </div>
  
      <div id="text9" className="animate0110" style={{ textAlign: "center" }}>
        {section9}
      </div>
</>
    
  );
}
