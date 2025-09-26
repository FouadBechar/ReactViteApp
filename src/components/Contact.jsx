import React, {useEffect} from "react";

// import d1 from "/src/assets/images/d1.webp";
// import image2ss from "/src/assets/images/image2ss.webp";
// import image3ss from "/src/assets/images/image3ss.webp";


export default function Contact() {

useEffect(() => {
  
 

  }, []);
  
 useEffect(() => {


    }, []);
  
  return (
    <>
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
  </>
    
  );
}
