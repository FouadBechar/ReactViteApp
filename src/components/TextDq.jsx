import React, { useEffect, useRef } from "react";

export default function TextDq() {
  const typedRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const scrollRef = useRef(null);
  const prevScrollHeightRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement || typeof ResizeObserver === "undefined") {
      return;
    }

    let rafId = null;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll by the delta (amount the content grew). This keeps the
    // viewport in sync with added lines and avoids jumping to the bottom
    // which can obscure the currently-typed line.
    const doScroll = (smooth = true, useDelta = true) => {
      if (!container) return;
      const behavior = prefersReduced ? "auto" : (smooth ? "smooth" : "auto");

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        try {
          const prev = prevScrollHeightRef.current || 0;
          const now = container.scrollHeight;
          const delta = now - prev;

          if (useDelta && delta > 0) {
            // scroll just by the growth amount so the current typing line stays visible
            try {
              container.scrollBy({ top: delta, behavior });
            } catch (err) {
              // fallback: jump to bottom
              container.scrollTo({ top: now, behavior });
            }
          } else if (delta < 0) {
            // content shrank (e.g. fade-out) -> return to top so the next content is visible
            try {
              container.scrollTo({ top: 0, behavior });
            } catch (err) {
              /* ignore */
            }
          } else {
            // no size change or useDelta=false: fallback to bottom/top depending on content
            if (now > container.clientHeight) {
              container.scrollTo({ top: now, behavior });
            } else {
              container.scrollTo({ top: 0, behavior });
            }
          }

          // update previous height after scrolling
          prevScrollHeightRef.current = container.scrollHeight;
        } catch (err) {
          // ignore scrolling errors
        } finally {
          rafId = null;
        }
      });
    };

    // expose so Typed.js callbacks can trigger it
    scrollRef.current = doScroll;

    const resizeObserver = new ResizeObserver(() => {
      // use delta-based scrolling for ResizeObserver events so we follow typed growth
      doScroll(true, true);
    });

    resizeObserver.observe(textElement);

    return () => {
      try {
        resizeObserver.disconnect();
      } catch (e) {
        /* ignore */
      }
      if (rafId) cancelAnimationFrame(rafId);
      scrollRef.current = null;
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
          onStringTyped: () => {
            // called each time a string finishes typing; scroll by delta so the typed line stays visible
            if (scrollRef.current) scrollRef.current(false, true);
          },
          onComplete: () => {
            // when cycle completes, perform a smooth scroll to bottom
            if (scrollRef.current) scrollRef.current(true, false);
          },
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
        <span  className="p1">
        </span>
      </div>
    </div>
  );
}
