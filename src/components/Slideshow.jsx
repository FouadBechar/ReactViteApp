import React, {useEffect} from "react";

import image1ss from "/src/assets/images/image1ss.webp";
import image2ss from "/src/assets/images/image2ss.webp";
import image3ss from "/src/assets/images/image3ss.webp";



export default function Slideshow() {

 const section8 = (
   <>
      <div className="mySlides fade">
        <div className="numbertext">1 / 3</div>
        <img className="imgslideshow" src={image1ss} alt="image" />
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
        <img className="imgslideshow" src={image2ss} alt="image" />
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
        <img className="imgslideshow" src={image3ss} alt="image" />
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

 
let cont = 0;
useEffect(() => {
 
   let slideIndex = 1;
  let slideInterval;
  let isPaused = false;

  function plusSlides(n) {
    if (!isPaused) {
      clearInterval(slideInterval);
      showSlides((slideIndex += n));
      slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
    }
  }

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  prevButton.addEventListener("click", () => plusSlides(-1));
  nextButton.addEventListener("click", () => plusSlides(1));

  function currentSlide(n) {
    if (!isPaused) {
      clearInterval(slideInterval);
      showSlides((slideIndex = n));
      slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
    }
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
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
    dots[slideIndex - 1].className += " active";
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    showSlides(slideIndex);
    slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
  });

  document.querySelectorAll(".mySlides").forEach((img) => {
    img.addEventListener("mouseover", () => {
      clearInterval(slideInterval);
      isPaused = true;
    });

    img.addEventListener("mouseout", () => {
      isPaused = false;
      slideInterval = setInterval(() => showSlides((slideIndex += 1)), 10000);
    });
  });

  }, [cont]);

 document.addEventListener("DOMContentLoaded", (event) => {
    cont += 1;
  });

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
