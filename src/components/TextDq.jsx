import React, { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

export default function TextDq() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const typeitInstance = useRef(null);

  useEffect(() => {
    // Respect user's reduced motion preference: skip TypeIt if requested
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // don't initialize TypeIt when user prefers reduced motion
      return undefined;
    }
    const container = containerRef.current;

    const instance = new TypeIt(textRef.current, {
      speed: 100,
      loop: true,
      waitUntilVisible: true,

      cursor: true,

      cursorChar: '|',

      afterStep: () => {
        if (container && container.scrollHeight > container.clientHeight) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'auto', // سريع بدون اهتزاز
          });
        }
      },
      afterDelete: () => {
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    })
      .type('🌍 The World Wide Fund for Nature (WWF) was founded in 1961.')
      .pause(1500)
      .delete(null, { instant: true })
      .type('🌱 It works in wilderness preservation and reducing human impact.')
      .pause(1500)
      .delete(null, { instant: true })
      .type('🐼 It was formerly named the World Wildlife Fund.')
      .pause(1500)
      .delete(null, { instant: true })
      .type("💚 WWF is the world's largest conservation organization.")
      .pause(1500)
      .delete(null, { instant: true })
      .go();

  typeitInstance.current = instance;

    return () => {
      try {
        instance.destroy();
      } catch (err) { console.debug('TextDq instance destroy error', err); }
      try {
        typeitInstance.current = null;
      } catch (err) { console.debug('TextDq clear instance error', err); }
    };
  }, []);

  // Robust pause/resume helpers that try several method names
  // small debounce guard to avoid thrash on rapid enter/leave
  let lastPause = 0;
  let lastResume = 0;
  const DEBOUNCE_MS = 200;

  const pauseTypeIt = () => {
    try {
      const inst = typeitInstance.current;
      if (!inst) return;
      // Prefer TypeIt's runtime freeze() which pauses the instance
        if (typeof inst.freeze === 'function') {
        try {
          const now = Date.now();
          if (now - lastPause < DEBOUNCE_MS) return;
          lastPause = now;
          inst.freeze();
          // freeze invoked
          return;
        } catch (err) { console.debug('TextDq freeze error', err); }
      }

      // Fallback: if a pause-like method exists and accepts no args, attempt to call it
      const fallbackCandidates = ['pause', 'stop', 'pauseTyping', 'halt'];
      for (const fn of fallbackCandidates) {
        if (typeof inst[fn] === 'function') {
            try {
              const now = Date.now();
              if (now - lastPause < DEBOUNCE_MS) return;
              lastPause = now;
              inst[fn]();
              return;
            } catch (err) { console.debug('TextDq fallback pause candidate error', err); }
        }
      }
    } catch (err) { console.error('TextDq.pauseTypeIt error', err); }
  };

  const resumeTypeIt = () => {
    try {
      const inst = typeitInstance.current;
      if (!inst) return;
      // resume called
      // Prefer TypeIt's unfreeze()
      if (typeof inst.unfreeze === 'function') {
          try {
            const now = Date.now();
            if (now - lastResume < DEBOUNCE_MS) return;
            lastResume = now;
            inst.unfreeze();
            return;
          } catch (err) { console.debug('TextDq unfreeze error', err); }
      }

      // Fallback: try go() which starts/continues the instance
      if (typeof inst.go === 'function') {
          try {
            const now = Date.now();
            if (now - lastResume < DEBOUNCE_MS) return;
            lastResume = now;
            inst.go();
            return;
          } catch (err) { console.debug('TextDq go() error', err); }
      }

      const fallbackCandidates = ['resume', 'start', 'play', 'continue', 'toggle', 'unpause'];
      for (const fn of fallbackCandidates) {
        if (typeof inst[fn] === 'function') {
            try {
              const now = Date.now();
              if (now - lastResume < DEBOUNCE_MS) return;
              lastResume = now;
              inst[fn]();
              return;
            } catch (err) { console.debug('TextDq fallback resume candidate error', err); }
        }
      }
    } catch (err) { console.error('TextDq.resumeTypeIt error', err); }
  };

  return (
    <div
      className="container"
      ref={containerRef}
      onMouseEnter={pauseTypeIt}
      onMouseLeave={resumeTypeIt}
      onPointerEnter={pauseTypeIt}
      onPointerLeave={resumeTypeIt}
      onTouchStart={pauseTypeIt}
      onTouchEnd={resumeTypeIt}
    >
      <span className="text1" ref={textRef}></span>
    </div>
  );
}
