import React, {useEffect} from "react";

// import d1 from "/src/assets/images/d1.webp";
// import image2ss from "/src/assets/images/image2ss.webp";
// import image3ss from "/src/assets/images/image3ss.webp";


export default function TextDq() {

useEffect(() => {
  
  const container = document.querySelector(".container");
const textElement = document.querySelector(".text1");

const resizeObserver = new ResizeObserver(() => {
  if (container.scrollHeight > container.clientHeight) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  } else {
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

resizeObserver.observe(textElement);

  }, []);
  
 useEffect(() => {

    }, []);
  
  return (
    <>
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
  </>
    
  );
}
