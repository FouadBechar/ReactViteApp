import React, { useEffect, useRef } from "react";

export default function TextDq() {
  const typedRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      try {
        if (container.scrollHeight > container.clientHeight) {
          container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        } else {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (e) {
        // ignore scrolling errors
      }
    });

    resizeObserver.observe(textElement);

    return () => {
      try {
        resizeObserver.disconnect();
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let mounted = true;

    // dynamic import so this runs only in the browser
    import("typed.js")
      .then(({ default: Typed }) => {
        if (!mounted || !textRef.current) return;

        const typed = new Typed(textRef.current, {
          strings: [
            "\u00A0 The World Wide Fund for Nature (WWF) is a Swiss-based international non-governmental organization founded in 1961",
            "\u00A0 that works in the field of wilderness preservation and the reduction of human impact on the environment",
            "\u00A0 It was formerly named the World Wildlife Fund, which remains its official name in Canada and the United States.",
            "\u00A0 WWF is the world's largest conservation organization.",
          ],
          typeSpeed: 50,
          backSpeed: 40,
          loop: true,
          fadeOut: true,
          fadeOutDelay: 0,
        });

        typedRef.current = typed;
      })
      .catch((err) => {
        // If dynamic import or Typed initialization fails, fallback to static text.
        console.warn("Failed to load typed.js", err);
      });

    return () => {
      mounted = false;
      try {
        if (typedRef.current && typeof typedRef.current.destroy === "function") {
          typedRef.current.destroy();
        }
      } catch (e) {
        /* ignore */
      }
      typedRef.current = null;
    };
  }, []);

  // handlers for controls
  function pauseTyping() {
    try {
      if (typedRef.current && typeof typedRef.current.stop === "function") {
        typedRef.current.stop();
      }
    } catch (e) {
      /* ignore */
    }
  }

  function resumeTyping() {
    try {
      if (typedRef.current && typeof typedRef.current.start === "function") {
        typedRef.current.start();
      }
    } catch (e) {
      /* ignore */
    }
  }

  return (
    <div className="container" ref={containerRef}>
      <div className="text1" ref={textRef} onMouseEnter={pauseTyping} onMouseLeave={resumeTyping}>
        <span className="p1">
          The World Wide Fund for Nature (WWF) is a Swiss-based international non-governmental organization founded in 1961.
        </span>
      </div>
    </div>
  );
}
