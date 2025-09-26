import React, {useEffect} from "react";

// import image1ss from "/src/assets/images/image1ss.webp";
// import image2ss from "/src/assets/images/image2ss.webp";
// import image3ss from "/src/assets/images/image3ss.webp";



export default function Videoshow() {



  

 

useEffect(() => {
 
   

  }, []);
 


  return (
    <>
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
  
</>
    
  );
}
