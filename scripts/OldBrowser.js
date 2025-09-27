  var ua = navigator.userAgent || "";

  var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  var noAddEvent = !("addEventListener" in window);

  var isOldWin = /(Windows XP|Windows Vista|Windows NT 6\.0)/i.test(ua);
  var isOldAndroid = /Android [0-4]\./i.test(ua);
  var isOldIOS = /(iPhone OS [0-9]_|\biPad; CPU OS [0-9]_)/i.test(ua);
  var isOldMac = /\bMac OS X 10_[0-9]\b/i.test(ua);

  var isLinux = /Linux/i.test(ua);
  var isVeryOldFirefox = /Firefox\/([0-2]?\d|3\d)\./i.test(ua); // 0–39
  var isVeryOldChrome = /(Chrome|Chromium)\/([0-2]?\d|3\d)\./i.test(ua); // 0–39
  var isVeryOldGecko = /rv:[0-4]\./i.test(ua);
  var isVeryOldOpera = /(Opera\/(9|10)|OPR\/(1\d|2\d))/i.test(ua);
  var isOldLinux =
    isLinux &&
    (isVeryOldFirefox || isVeryOldChrome || isVeryOldGecko || isVeryOldOpera);

  var isOldOS = isOldWin || isOldAndroid || isOldIOS || isOldMac || isOldLinux;

  var hasModern =
    "querySelector" in document &&
    "addEventListener" in window &&
    "localStorage" in window &&
    "JSON" in window &&
    "Promise" in window &&
    "fetch" in window;

  var isOldBrowser = !hasModern;

  var docEl = document.documentElement || {};
  var docDir = (docEl.dir || "").toLowerCase();
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var isArabic = docDir === "rtl" || lang.indexOf("ar") === 0;

  var STR = isArabic
    ? {
        title: "تنبيه مهم",
        desc: "يبدو أن متصفحك أو نظام التشغيل لديك قديم، وقد لا يعرض هذا الموقع بالشكل الصحيح. للحصول على أفضل أداء وأمان، يرجى تحديث المتصفح.",
        btn: "كيفية تحديث المتصفح",
        dir: "rtl",
      }
    : {
        title: "Important notice",
        desc: "Your browser or operating system appears to be outdated and may not display this site correctly. For best performance and security, please update your browser.",
        btn: "How to update your browser",
        dir: "ltr",
      };

  var GUIDE =
    "https://www.whatismybrowser.com/guides/how-to-update-your-browser/";

  function baseCSS() {
    return (
      "" +
      "body{margin:0;padding:0}" +
      ".full-warning{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;" +
      "display:flex;flex-direction:column;justify-content:center;align-items:center;" +
      "background:#111;color:#eee;text-align:center;padding:24px;z-index:9999999;direction:" +
      STR.dir +
      "}" +
      ".full-warning .fw-inner{max-width:760px;margin:0 16px;background:#1a1a1a;padding:20px 18px;" +
      "border:1px solid #2a2a2a;/* older IE ignores radius/shadow */border-radius:10px}" +
      ".full-warning h1{font-size:26px;margin:0 0 10px;font-family:Arial,Helvetica,sans-serif}" +
      ".full-warning p{font-size:15px;line-height:1.65;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif}" +
      ".full-warning .actions{margin-top:8px;display:flex;gap:12px;flex-wrap:wrap;justify-content:center}" +
      ".full-warning a.btn{display:inline-block;background:#3a86ff;color:#fff;text-decoration:none;" +
      "padding:10px 14px;border-radius:8px;font-size:14px;font-family:Arial,Helvetica,sans-serif}" +
      ".full-warning a.btn:focus{outline:2px solid #fff;outline-offset:2px}"
    );
  }

  function writeOverlayWithDocumentWrite() {
    var html =
      "<style>" +
      baseCSS() +
      "</style>" +
      '<div class="full-warning">' +
      '<div class="fw-inner">' +
      "<h1>" +
      STR.title +
      "</h1>" +
      "<p>" +
      STR.desc +
      "</p>" +
      '<div class="actions">' +
      '<a class="btn" href="' +
      GUIDE +
      '" target="_blank" rel="noopener">' +
      STR.btn +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>";
    document.write(html);
  }

  function injectOverlay() {
    var style = document.createElement("style");
    style.type = "text/css";
    var css = baseCSS();
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    (
      document.head ||
      document.getElementsByTagName("head")[0] ||
      document.documentElement
    ).appendChild(style);

    var box = document.createElement("div");
    box.className = "full-warning";
    box.innerHTML =
      '<div class="fw-inner">' +
      "<h1>" +
      STR.title +
      "</h1>" +
      "<p>" +
      STR.desc +
      "</p>" +
      '<div class="actions">' +
      '<a class="btn" href="' +
      GUIDE +
      '" target="_blank" rel="noopener">' +
      STR.btn +
      "</a>" +
      "</div>" +
      "</div>";

    var append = function () {
      if (document.body) {
        document.body.appendChild(box);
      } else {
        document.documentElement.appendChild(box);
      }
    };
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      append();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", append, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") append();
      });
    } else {
      setTimeout(append, 50);
    }
  }

  if (isIE || noAddEvent) {
    if (document.readyState === "loading") {
      writeOverlayWithDocumentWrite();
    } else {
      injectOverlay();
    }
  } else if (isOldOS || isOldBrowser) {
    injectOverlay();
  }
