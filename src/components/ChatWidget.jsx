import React, { useEffect, useRef, useState } from "react";
import icon from "/src/assets/images/chat-icon.png";
import icons2 from "/src/assets/images/icons2.svg";
import icons1 from "/src/assets/images/icons1.svg";
import icons03 from "/src/assets/images/icons03.svg";


function sanitizeLinksReact(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a key={match.index} href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    );
    lastIndex = match.index + url.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function ChatWidget() {
  const STORAGE_KEY = "chatHistory";
  const [messages, setMessages] = useState([]); // {role, text}
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    // load history
    try {
      const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setMessages(hist);
    } catch (_) {}
    // warm up connection (fire-and-forget)
    (async function warmUp() {
      try {
        await fetch("https://chat-779e.onrender.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "system", content: "warmup" }] }),
        });
        // console.log("🔥 Chat server warmed up!");
      } catch (_) {}
    })();
  }, []);

  useEffect(() => {
    // persist
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (_) {}
  }, [messages]);

  useEffect(() => {
    // scroll to bottom whenever messages change
    try {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (_) {}
  }, [messages]);

  function clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    setMessages([]);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) {
      // show a bot message for empty
      setMessages((m) => [...m, { role: "bot", text: "⚠️ Message is empty. Please say something." }]);
      return;
    }
    if (text.length > 300) {
      setMessages((m) => [...m, { role: "bot", text: "Your message is too long. Please shorten it." }]);
      return;
    }

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setSending(true);

    const typingIndex = messages.length + 1;
    setMessages((m) => [...m, { role: "bot", text: "..." }]);

    try {
      const res = await fetch("https://chat-779e.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: text }] }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error("No valid response from the bot.");
      // replace typing placeholder with reply
      setMessages((m) => {
        const copy = m.slice();
        // remove last typing placeholder (best-effort)
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].role === "bot" && copy[i].text === "...") {
            copy.splice(i, 1);
            break;
          }
        }
        copy.push({ role: "bot", text: data.reply });
        return copy;
      });
    } catch (err) {
      setMessages((m) => {
        const copy = m.slice();
        // remove typing
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].role === "bot" && copy[i].text === "...") {
            copy.splice(i, 1);
            break;
          }
        }
        copy.push({ role: "bot", text: `🤖 Error while connecting: ${err.message || err}` });
        return copy;
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button id="chat-toggle" type="button" onClick={() => setOpen(true)} style={{ display: open ? "none" : "block" }}>
        <img src={chat-icon} alt="chat Logo" width="50px" height="31px" />
      </button>

      <div id="chat-box" style={{ display: open ? "flex" : "none" }}>
        <div id="chat-header">
          <span>
            <img className="img707" src={icons03} alt="icons03" />
          </span>
          <button id="clear-btn" title="Clear Chat" onClick={clearHistory}>
            <img className="img708" src={icons1} alt="icons1" />
          </button>
          <button id="close-btn" title="Close" onClick={() => setOpen(false)}>
            <img className="img709" src={icons2} alt="icons2" />
          </button>
        </div>

        <div id="chat-messages" ref={messagesRef} style={{ overflowY: "auto", maxHeight: 300 }}>
          {messages.map((m, idx) => (
            <div className={`bubble ${m.role}`} key={idx} style={{ animation: "fadeInUp 0.4s ease-out" }}>
              <div className="bubble-content">
                {typeof m.text === "string" ? sanitizeLinksReact(m.text) : m.text}
              </div>
            </div>
          ))}
        </div>

        <div id="chat-input">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!sending) sendMessage();
              }
            }}
          />
          <button type="button" id="send-btn" title="send-btn" onClick={() => !sending && sendMessage()} disabled={sending}>
            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" style={{ width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1">
              <path d="M41.353846 876.307692l86.646154-320.984615h366.276923c9.846154 0 19.692308-9.846154 19.692308-19.692308v-39.384615c0-9.846154-9.846154-19.692308-19.692308-19.692308H128l-84.676923-315.076923C41.353846 157.538462 39.384615 151.630769 39.384615 145.723077c0-13.784615 13.784615-27.569231 29.538462-25.6 3.938462 0 5.907692 1.969231 9.846154 1.969231l886.153846 364.307692c11.815385 3.938462 19.692308 15.753846 19.692308 27.569231s-7.876923 21.661538-17.723077 25.6L78.769231 913.723077c-3.938462 1.969231-7.876923 1.969231-11.815385 1.969231-15.753846-1.969231-27.569231-13.784615-27.569231-29.538462 0-3.938462 0-5.907692 1.969231-9.846154z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
