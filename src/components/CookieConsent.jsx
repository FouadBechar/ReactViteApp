import React, { useEffect, useRef, useState } from "react";

// Small, accessible cookie consent dialog component
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const acceptRef = useRef(null);
  const declineRef = useRef(null);
  const hideTimerRef = useRef(null);

  function readCookie(name) {
    if (typeof document === "undefined") return undefined;
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
    try {
      return raw ? decodeURIComponent(raw) : undefined;
    } catch (e) {
      return raw;
    }
  }

  function setCookie(name, value, days) {
    if (typeof document === "undefined") return;
    const maxAge = days * 24 * 60 * 60;
    const isSecure =
      typeof window !== "undefined" && window.location.protocol === "https:";
    const secureAttr = isSecure ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax${secureAttr}`;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = readCookie("consent");
    if (!existing) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    // move focus to accept button when shown
    setTimeout(() => {
      try {
        acceptRef.current?.focus();
      } catch (err) { console.debug('CookieConsent focus error', err); }
    }, 50);

    // add key handling (Escape to close, simple focus trap)
    function onKey(e) {
      if (e.key === "Escape") {
        // animate hide on Escape as well
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsHiding(true);
        hideTimerRef.current = setTimeout(() => setVisible(false), 600);
      }
      if (e.key === "Tab") {
        // keep tab within two buttons
        if (document.activeElement === acceptRef.current && e.shiftKey) {
          e.preventDefault();
          declineRef.current?.focus();
        } else if (document.activeElement === declineRef.current && !e.shiftKey) {
          e.preventDefault();
          acceptRef.current?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  function accept() {
    setCookie("consent", "accepted", 30);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsHiding(true);
    hideTimerRef.current = setTimeout(() => setVisible(false), 600);
  }

  function decline() {
    setCookie("consent", "declined", 30);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsHiding(true);
    hideTimerRef.current = setTimeout(() => setVisible(false), 600);
  }

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="cookie-consent"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-dialog-title"
      aria-describedby="cookie-message"
      className={`cookie-consent ${isHiding ? "hide" : "show2"}`}
    >
      <h2 id="cookie-dialog-title" className="visually-hidden2">
        Cookie Consent
      </h2>
      <p id="cookie-message">This site uses cookies to enhance your experience.</p>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          id="accept"
          ref={acceptRef}
          title="accept"
          aria-label="Accept cookies"
          onClick={accept}
        >
          Accept
        </button>
        <button
          type="button"
          id="decline"
          ref={declineRef}
          title="decline"
          aria-label="Decline cookies"
          onClick={decline}
        >
          Decline
        </button>
      </div>
    </div>
  );
}