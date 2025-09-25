import React, { useEffect } from "react";

export default function chatBot() {
  
  useEffect(() => {


  const chatBox = document.getElementById("chat-box");
  const chatToggle = document.getElementById("chat-toggle");
  const closeBtn = document.getElementById("close-btn");
  const clearBtn2 = document.getElementById("clear-btn");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  const i18n = {
    en: {
      tooLong: "Your message is too long. Please shorten it.",
      fetchErr: (err) => `🤖 Error while connecting: ${err}`,
      defaultReply: "🤖 ...",
      emptyMsg: "⚠️ Message is empty. Please say something.",
    },
    ar: {
      tooLong: "رسالتك طويلة جدًا. قصّرها شوية من فضلك.",
      fetchErr: (err) => `🤖 حدث خطأ أثناء الاتصال: ${err}`,
      defaultReply: "🤖 ...",
      emptyMsg: "⚠️ الرسالة فارغة. أرسل شيئًا مفيدًا",
    },
    fr: {
      tooLong: "Votre message est trop long. Veuillez le raccourcir.",
      fetchErr: (err) => `🤖 Erreur de connexion : ${err}`,
      defaultReply: "🤖 ...",
      emptyMsg: "⚠️ Le message est vide. Écrivez quelque chose.",
    },
  };

  function detectLanguage(text) {
    if (/[؀-ۿ]/.test(text)) return "ar";
    if (/[éèêàâùûôçïü]/i.test(text)) return "fr";
    return "en";
  }

  const STORAGE_KEY = "chatHistory";
  let messagesHistory = [];

  function saveToHistory(text, role) {
    try {
      const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      hist.push({ text, role });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
    } catch (_) {}
  }

  function loadHistory() {
    try {
      const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      hist.forEach((msg) => appendMessage(msg.text, msg.role, false));
    } catch (_) {}
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    messagesHistory = [];
    chatMessages.innerHTML = "";
  }

  function appendMessage(content, role, save = true) {
    const messageElement = createMessageElement(content, role);
    chatMessages.appendChild(messageElement);
    messageElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (save) saveMessage(content, role);
    scrollToBottom();
    return messageElement;
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function createMessageElement(content, role) {
    const msg = document.createElement("div");
    msg.className = `bubble ${role}`;
    msg.style.animation = "fadeInUp 0.4s ease-out";

    const inner = document.createElement("div");
    inner.className = "bubble-content";

    if (typeof content === "string") {
      inner.innerHTML = sanitizeLinks(content);
    } else {
      inner.appendChild(content);
    }

    msg.appendChild(inner);
    return msg;
  }

  function sanitizeLinks(text) {
    const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return escaped.replace(/(https?:\/\/[^\s]+)/g, (url) => {
      if (!/^https?:\/\//i.test(url)) return url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }

  function saveMessage(content, role) {
    try {
      const cleanText =
        typeof content === "string" ? content : content.textContent;
      saveToHistory(cleanText, role);
    } catch (err) {
      console.warn("⚠️ Failed to save message:", err);
    }
  }

  function showTyping() {
    const dots = document.createElement("span");
    dots.className = "typing-dots";
    dots.innerHTML = "<span>.</span><span>.</span><span>.</span>";
    return appendMessage(dots, "bot", false);
  }

  chatToggle.addEventListener("click", () => {
    chatBox.classList.remove("fade-out");
    void chatBox.offsetWidth;
    chatBox.classList.add("bounce-in");
    chatBox.style.display = "flex";
    chatToggle.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("bounce-in");
    chatBox.classList.add("fade-out");
    chatBox.style.display = "none";
    chatToggle.style.display = "block";
  });

  clearBtn2.addEventListener("click", clearHistory);

  async function sendMessage() {
    const message = userInput.value.trim();
    const lang = detectLanguage(message);

    if (!message) {
      appendMessage(i18n[lang].emptyMsg, "bot");
      return;
    }

    if (message.length > 300) {
      appendMessage(i18n[lang].tooLong, "bot");
      return;
    }

    appendMessage(message, "user");
    userInput.value = "";
    messagesHistory.push({ role: "user", content: message });

    const typingPlaceholder = showTyping();
    try {
      sendBtn.disabled = true;
      const res = await fetch("https://chat-779e.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesHistory }),
      });

      const data = await res.json();
      if (!res.ok || !data.reply?.trim())
        throw new Error("No valid response from the bot.");

      typingPlaceholder.remove();
      appendMessage(data.reply, "bot");
      messagesHistory.push({ role: "assistant", content: data.reply });
      saveToHistory(data.reply, "bot");
    } catch (err) {
      typingPlaceholder.remove();
      appendMessage(i18n[lang].fetchErr(err.message), "bot");
    } finally {
      sendBtn.disabled = false;
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Warm-up connection when the page loads
  async function warmUpConnection() {
    try {
      await fetch("https://chat-779e.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: "warmup" }],
        }),
      });
      console.log("🔥 Chat server warmed up!");
    } catch (err) {
      console.warn("⚠️ Warm-up failed:", err.message);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    if (messagesHistory.length === 0) {
      appendMessage("Hello! How can I assist you today?", "bot", false);
    }
    warmUpConnection();
  });

    
    
  }, []);
  
return;
  
}
