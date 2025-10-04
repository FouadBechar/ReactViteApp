import React, { useEffect } from "react";

import d1 from "/src/assets/images/d1.webp";


export default function Videoshow() {

  useEffect(() => {
    const openPop11 = document.querySelector(".open01");
    const closeBtn = document.querySelector(".close");
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
        vividd1.play().catch((err) => { console.debug('Videoshow play() promise rejected', err); });
      } catch (err) { console.debug('Videoshow play error', err); }
    }

    function handleClose() {
      wrapper.classList.remove("active");
      try {
        vividd1.pause();
        vividd1.currentTime = 0;
      } catch (err) { console.debug('Videoshow pause/reset error', err); }
      vividd1.src = "";
    }

    openPop11.addEventListener("click", handleOpen);
    closeBtn.addEventListener("click", handleClose);

    return () => {
      try {
        openPop11.removeEventListener("click", handleOpen);
      } catch (err) { console.debug('Videoshow remove openPop11 listener error', err); }
      try {
        closeBtn.removeEventListener("click", handleClose);
      } catch (err) { console.debug('Videoshow remove closeBtn listener error', err); }
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
            <button type="button" className="lien01">
              WWF
            </button>
          </a>
          <button type="button" className="close01">Close</button>
        </div>
      </div>
    </>
  );
}
