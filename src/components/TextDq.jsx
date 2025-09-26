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

var typed = new Typed("#p010101", {
  strings: ["&nbsp; The World Wide Fund for Nature (WWF) is a Swiss-based international non-governmental organization founded in 1961", "&nbsp; that works in the field of wilderness preservation  and the reduction of human impact on the environment", "&nbsp; It was formerly named the World Wildlife Fund,  which remains its official name in Canada and the United States.", "&nbsp; WWF is the world's largest conservation organization."],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});
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
