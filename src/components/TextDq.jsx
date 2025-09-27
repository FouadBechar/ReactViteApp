import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TextDq() {
  const typedRef = useRef(null);
  useEffect(() => {
    const container = document.querySelector(".container");
    const textElement = document.querySelector(".text1");

    if (!container || !textElement || typeof ResizeObserver === "undefined") {  
      // Nothing to observe or environment doesn't support ResizeObserver       
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      try {
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
      } catch (e) {
        // ignore scrolling errors
      }
    });

    resizeObserver.observe(textElement);

    return () => {
      try {
        resizeObserver.disconnect();
  } catch (e) { console.debug(e); }
    };
  }, []);

  useEffect(() => {
    let typed = null;
    try {
      if (Typed) {
        typed = new Typed("#p010101", {
          strings: [
            "\u00A0 The World Wide Fund for Nature (WWF) is a Swiss-based international non-governmental organization founded in 1961",
            "\u00A0 that works in the field of wilderness preservation and the reduction of human impact on the environment",
            "\u00A0 It was formerly named the World Wildlife Fund, which remains its official name in Canada and the United States.",
            "\u00A0 WWF is the world's largest conservation organization.",
          ],
          typeSpeed: 50, // faster typing
          backSpeed: 40, // faster backspace (unused when fadeOut is true)      
          loop: true,
          fadeOut: true,
          fadeOutDelay: 0,
        });
        typedRef.current = typed;
      }
    } catch (e) {
      console.warn("Error initializing Typed.js:", e);
    }

    return () => {
      try {
        if (typed && typeof typed.destroy === "function") typed.destroy();      
      } catch (e) { console.debug(e); }
      typedRef.current = null;
    };
  }, []);

  // handlers for controls
  function pauseTyping() {
    try {
      if (typedRef.current && typeof typedRef.current.stop === "function") {    
        typedRef.current.stop();
      }
  } catch (e) { console.debug(e); }
  }

  function resumeTyping() {
    try {
      if (typedRef.current && typeof typedRef.current.start === "function") {   
        typedRef.current.start();
      }
  } catch (e) { console.debug(e); }
  }

  return (
    <>
      <div className="container">
        <div
          className="text1"
          onMouseEnter={pauseTyping}
          onMouseLeave={resumeTyping}
        >
          {/* <span id="p010101" className="p1">
            The World Wide Fund for Nature (WWF) is a Swiss-based international 
            non-governmental organization founded in 1961.
          </span> */}
        </div>
      </div>
    </>
  );
}
