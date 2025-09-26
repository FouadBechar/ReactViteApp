import React, {useEffect} from "react";

import d1 from "/src/assets/images/d1.webp";
// import image2ss from "/src/assets/images/image2ss.webp";
// import image3ss from "/src/assets/images/image3ss.webp";



export default function Videoshow() {



  

 

useEffect(() => {

  var vido;
  var clo;
  var im00;
  var aaa001;
  var divvv12;

  function video() {
    vido = document.getElementById("vid");
    clo = document.getElementById("cl");
    im00 = document.getElementById("im0");
    aaa001 = document.getElementById("aa001");
    divvv12 = document.getElementById("divv12");
    vido.src =
      "https://res.cloudinary.com/dougpslkv/video/upload/v1708992004/WWF.mp4";
    clo.style.display = "block";
    vido.style.display = "block";
    aaa001.style.display = "block";
    im00.style.display = "none";
    divvv12.style.display = "none";
  }

  function closse() {
    vido = document.getElementById("vid");
    clo = document.getElementById("cl");
    clo.style.display = "none";
    vido.style.display = "none";
    aaa001.style.display = "none";
    im00.style.display = "block";
    divvv12.style.display = "block";
    vido.src = "";
  }

   

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
