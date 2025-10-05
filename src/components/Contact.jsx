import React, { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    const formContainer = document.getElementById('form-container');
    const form = document.getElementById('my-form');
    const closeBtn2 = document.getElementById('close-btn2');
    const openBtn = document.getElementById('open-btn');
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const responseMsg = document.getElementById('responseMessage');
    const loadingOverlay = document.getElementById('loading-overlay');

    let isClosing = false;

    // If essential elements are missing, do not attach handlers
    if (
      !formContainer ||
      !form ||
      !closeBtn2 ||
      !openBtn ||
      !fileInput ||
      !filePreview ||
      !responseMsg
    ) {
      console.warn('Contact form: some DOM elements are missing; skipping initialization.');
      return;
    }

    function handleOpen() {
      form.classList.remove('fade-out');
      // force reflow to restart animation
      void form.offsetWidth;
      form.classList.add('bounce-in');
      formContainer.style.display = 'flex';
      openBtn.style.display = 'none';
    }

    function handleClose() {
      if (isClosing) return;
      isClosing = true;
      form.classList.remove('bounce-in');
      form.classList.add('fade-out');
      setTimeout(() => {
        formContainer.style.display = 'none';
        responseMsg.textContent = '';
        responseMsg.style.padding = '0px';
        openBtn.style.display = 'inline-block';
        isClosing = false;
      }, 600);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      // show loading overlay
      try {
        if (loadingOverlay) {
          loadingOverlay.style.display = 'flex';
          loadingOverlay.setAttribute('aria-hidden', 'false');
        }
      } catch (err) {
        console.debug('Contact show loading overlay error', err);
      }
      const formData = new FormData(form);
      try {
        const res = await fetch('https://fouadbechar.x10.mx/p/api05', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json().catch(() => ({}));
        const message = data && data.message ? data.message : 'Submission complete';
        const status = data && data.status ? data.status : res.ok ? 'success' : 'error';
        responseMsg.textContent = message;
        responseMsg.style.color = status === 'success' ? 'green' : 'red';
        responseMsg.style.padding = '4px';

        if (status === 'success') {
          form.reset();
          filePreview.textContent = '';
        }
      } catch (err) {
        responseMsg.textContent = 'Error: ' + (err && err.message ? err.message : String(err));
        responseMsg.style.color = 'red';
      } finally {
        // hide loading overlay
        try {
          if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
            loadingOverlay.setAttribute('aria-hidden', 'true');
          }
        } catch (err) {
          console.debug('Contact hide loading overlay error', err);
        }
      }
    }

    function handleFileChange() {
      const files = fileInput.files;
      if (files && files[0] && files[0].size > 5 * 1024 * 1024) {
        // show message in response area instead of alert
        responseMsg.textContent = 'File too large (max 5MB)';
        responseMsg.style.color = 'red';
        fileInput.value = '';
        filePreview.textContent = '';
      } else {
        filePreview.textContent = files && files.length > 0 ? 'Selected: ' + files[0].name : '';
        // clear any previous error
        if (responseMsg.textContent && responseMsg.style.color === 'red') {
          responseMsg.textContent = '';
          responseMsg.style.padding = '0px';
        }
      }
    }

    openBtn.addEventListener('click', handleOpen);
    closeBtn2.addEventListener('click', handleClose);
    form.addEventListener('submit', handleSubmit);
    fileInput.addEventListener('change', handleFileChange);

    // cleanup
    return () => {
      try {
        openBtn.removeEventListener('click', handleOpen);
      } catch (err) {
        console.debug('Contact cleanup openBtn', err);
      }
      try {
        closeBtn2.removeEventListener('click', handleClose);
      } catch (err) {
        console.debug('Contact cleanup closeBtn2', err);
      }
      try {
        form.removeEventListener('submit', handleSubmit);
      } catch (err) {
        console.debug('Contact cleanup form', err);
      }
      try {
        fileInput.removeEventListener('change', handleFileChange);
      } catch (err) {
        console.debug('Contact cleanup fileInput', err);
      }
    };
  }, []);

  return (
    <>
      <div id="form-container">
        {/* loading overlay - shown during form submission */}
        <div
          id="loading-overlay"
          role="status"
          aria-hidden="true"
          style={{
            display: 'none',
            position: 'absolute',
            background: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            color: '#fff',
            fontSize: '18px',
          }}
        >
          <div>
            <div className="spinner02" aria-hidden="true" style={{ marginBottom: 8 }} />
            Sending...
          </div>
        </div>
        <form id="my-form" className="animated" encType="multipart/form-data" method="POST">
          <button type="button" id="close-btn2" title="close-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="22px"
              height="22px"
              fillRule="nonzero"
            >
              <g
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: 'normal' }}
              >
                <g transform="scale(3.55556,3.55556)">
                  <path d="M19,15c-1.023,0 -2.04812,0.39087 -2.82812,1.17188c-1.562,1.562 -1.562,4.09425 0,5.65625l14.17188,14.17188l-14.17187,14.17188c-1.562,1.562 -1.562,4.09425 0,5.65625c0.78,0.78 1.80513,1.17188 2.82813,1.17188c1.023,0 2.04812,-0.39088 2.82813,-1.17187l14.17188,-14.17187l14.17188,14.17188c1.56,1.562 4.09525,1.562 5.65625,0c1.563,-1.563 1.563,-4.09325 0,-5.65625l-14.17187,-14.17187l14.17188,-14.17187c1.562,-1.562 1.562,-4.09425 0,-5.65625c-1.56,-1.561 -4.09625,-1.562 -5.65625,0l-14.17187,14.17188l-14.17187,-14.17187c-0.78,-0.78 -1.80513,-1.17187 -2.82812,-1.17187z" />
                </g>
              </g>
            </svg>
          </button>
          <h2>Contact Form</h2>
          <p id="responseMessage" className="pp00"></p>
          <input className="input02" type="text" name="prenom" placeholder="First Name" required />
          <input className="input02" type="text" name="nom" placeholder="Last Name" required />
          <input
            className="input02"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <textarea className="textarea02" name="textarea" placeholder="Your message"></textarea>
          <input
            className="input002"
            type="file"
            name="file"
            id="file-input"
            placeholder="selet file"
          />
          <div id="file-preview" className="preview"></div>
          <button className="button2" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
