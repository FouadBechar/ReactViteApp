import React, { useEffect } from "react";

import d1 from "/src/assets/images/d1.webp";


export default function Videoshow() {

  useEffect(() => {
    const openPop11 = document.querySelector(".open01");
    const closeBtn = document.querySelector(".close button");
    const wrapper = document.querySelector(".wrapper");
    const vividd1 = document.querySelector(".vividd");

    if (!openPop11 || !closeBtn || !wrapper || !vividd1) {
      console.warn('Videoshow: required DOM elements missing, skipping initialization');
      return;
    }

    function handleOpen() {
      wrapper.classList.add("active");
      // set source then try to play
      vividd1.src = "https://res.cloudinary.com/dgi9vyjff/video/upload/v1729979577/WWF.mp4";
      try {
        // muted helps autoplay on many browsers
        vividd1.muted = true;
        vividd1.play().catch(() => {});
      } catch (e) {}
    }

    function handleClose() {
      wrapper.classList.remove("active");
      try {
        vividd1.pause();
        vividd1.currentTime = 0;
      } catch (e) {}
      vividd1.src = "";
    }

    openPop11.addEventListener("click", handleOpen);
    closeBtn.addEventListener("click", handleClose);

    return () => {
      try {
        openPop11.removeEventListener("click", handleOpen);
      } catch (e) {}
      try {
        closeBtn.removeEventListener("click", handleClose);
      } catch (e) {}
    };
  }, []);
 
  return (
    <>
      <div className="wrapper010" />
      <div className="open01">
        <img
          className="grid1img"
          src={d1}
          width={200}
          height={133}
          alt="WWF preview"
        />
      </div>

      <div className="wrapper">
        <video className="vividd" src="" preload="auto" controls muted />
        <div className="close">
          <a href="https://www.worldwildlife.org/" target="_parent" rel="noreferrer">
            <button type="button" className="lien">
              WWF
            </button>
          </a>
          <button type="button">Close</button>
        </div>
      </div>
    </>
  );
}
