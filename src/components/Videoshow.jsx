import React, {useEffect} from "react";

import d1 from "/src/assets/images/d1.webp";
// import image2ss from "/src/assets/images/image2ss.webp";
// import image3ss from "/src/assets/images/image3ss.webp";



export default function Videoshow() {



  

 

useEffect(() => {
  const openPop11 = document.querySelector(".open01");
  const closePop11 = document.querySelector(".close");
  const wrapper = document.querySelector(".wrapper");
  const vividd1 = document.querySelector(".vividd");
  openPop11.addEventListener("click", () => {
    wrapper.classList.add("active");
    vividd1.src =
      "https://res.cloudinary.com/dgi9vyjff/video/upload/v1729979577/WWF.mp4";
  });
  closePop11.addEventListener("click", () => {
    wrapper.classList.remove("active");
    vividd1.src = "";
  });

  }, []);
 
  return (
    <>
  <div className="wrapper010" />
      <div className="open01">
        <img
          className="grid1img"
          src={d1}
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
  
</>
    
  );
}
