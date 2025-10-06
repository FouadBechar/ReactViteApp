import React from 'react';

import image0104 from '/src/assets/images/image0104.webp';
import image0105 from '/src/assets/images/image0105.webp';
import youtb from '/src/assets/images/youtb.webp';
import ml from '/src/assets/images/ml.webp';

export default function Footer() {
  const footer = (
    <>
      <span className="footer01sp">
        <a className="loadicon010101" href="https://www.facebook.com/FouadBechar2" target="_parent">
          <img className="img321" src={image0104} alt="image0102" width="30px" height="30px" />
        </a>
        <a className="loadicon010101" href="https://x.com/FouadBechar" target="_parent">
          <img className="im0im1" src={image0105} alt="image0105" width="30px" height="30px" />
        </a>
        <a
          className="loadicon010101"
          href="https://www.youtube.com/channel/UCi3RVanUvgW2o1Ld5lt7EjA"
          target="_parent"
        >
          <img className="im0im2" src={youtb} alt="image0105" width="43px" height="30px" />
        </a>
        <img id="open-btn" src={ml} alt="email" width="30px" height="30px" />
      </span>
      <div className="pr0101">
        <a href="/privacy/" target="_parent">
          Privacy Policy
        </a>
      </div>
    </>
  );
  return (
    <footer id="text11" className="foter">
      {footer}
    </footer>
  );
}
