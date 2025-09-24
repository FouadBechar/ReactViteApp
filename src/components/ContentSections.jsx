import React from 'react'

const htmls = {
  text1: `
  <section>
    <h1 class='bb7'><a class='loadicon010101' href='https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment' target='_parent'>12 ways you can protect the environment</a></h1>
    <img class='iiim' src='https://fouadbechar.x10.mx/p/m/image4.webp' alt='image' width='400px' height='224px'/>
    <p class='b3'>Most of the damage to our environment stems from consumption: what we consume, how much we consume and how often. Whether it’s gas,food, clothing, cars, furniture, water, toys, electronics, knick-knacks or other goods, we are all consumers. The key is not to stop consuming, but to start being mindful of our consumption habits and how each purchase or action affects the ecosystem. The good news is that it’s often not too difficult, expensive, or inconvenient to become more environmentally friendly. It can even be a fun challenge to implement among your family or coworkers. And though small changes at the individual level may seem trivial, just think how much cleaner the planet would be If everyone adopts behavior modification. <i class='i0i1'><a class='loadicon010101' href='https://www.greenmountainenergy.com/why-renewable-energy/protect-the-environment' target='_parent'>(continued..)</a></i></p>
  </section>
  `,
  text2: `
  <section>
    <h2 class='bb7'><a class='loadicon010101' href='https://www.un.org/en/climatechange/raising-ambition/renewable-energy' target='_parent'>Renewable energy</a></h2>
    <img class='iiim' src='https://fouadbechar.x10.mx/p/m/enrg.webp' alt='image' width='400px' height='224px'/>
    <p class='b3'>Renewable energy is energy derived from natural sources that are replenished at a higher rate than they are consumed. Sunlight and wind, for example, are such sources that are constantly being replenished. Renewable energy sources are plentiful and all around us. Fossil fuels - coal, oil and gas - on the other hand, are non-renewable resources that take hundreds of millions of years to form. Fossil fuels, when burned to produce energy, cause harmful greenhouse gas emissions, such as carbon dioxide. Generating renewable energy creates far lower emissions than burning fossil fuels. Transitioning from fossil fuels, which currently account for the lion’s share of emissions, to renewable energy is key to addressing the climate crisis. Renewables are now cheaper in most countries, and generate three times more jobs than fossil fuels. <i class='i0i1'><a class='loadicon010101' href='https://www.un.org/en/climatechange/raising-ambition/renewable-energy' target='_parent'> (continued..) </a></i></p>
  </section>
  `,
  text3: `
  <section>
    <h1 class='bb7'><a class='loadicon010101' href='https://www.aroundrobin.com/importance-of-social-justice/' target='_parent'>The importance of social justice</a></h1>
    <img class='iim' src='https://fouadbechar.x10.mx/p/m/image5.webp' alt='image' width='300px' height='192px'/>
    <p class='b3'>We are living in an era of contradictions. While we should focus on building a unified approach towards fighting a global pandemic, we are more divided than ever. We are more connected than ever before in human history, yet are unable to understand the plight of others. We see an evolution of human rights, but see no end to conflict. We are more willing to accept differences, yet discrimination is on the rise. We are living in an era where we have greater freedoms than ever before, yet we see no end to injustice. So where do we go from here? Is there a way to heal the world? Social justice may be the answer. <i class='i0i1'><a class='loadicon010101' href='https://www.aroundrobin.com/importance-of-social-justice/' target='_parent'>(continued..)</a></i></p>
  </section>
  `,
  // for brevity include only a few sections; footer content below
  aiCardGrid: `
    <div class='ai-card'>
      <img src='https://fouadbechar.x10.mx/p/m/gpt01.webp' alt='ChatGPT Logo' width='50px' height='50px'/>
      <h3>ChatGPT</h3>
      <p>Smart assistant for programming, writing, and imaginative ideas.</p>
      <a href='https://chat.openai.com/' target='_parent'>Try it now</a>
    </div>
    <div class='ai-card'>
      <img src='https://fouadbechar.x10.mx/p/m/gemini01.webp' alt='Gemini Logo' width='50px' height='50px'/>
      <h3>Gemini</h3>
      <p>Artificial intelligence for creativity, search, and images from Google.</p>
      <a href='https://gemini.google.com/' target='_parent'>Try it now</a>
    </div>
  `,
  footer: `
    <center>
      <span>
        <a class='loadicon010101' href='https://www.facebook.com/FouadBechar2' target='_parent'>
          <img class='img321' src='https://fouadbechar.x10.mx/p/m/image0104.webp' alt='image0102' width='30px' height='30px'/>
        </a>
        <a class='loadicon010101' href='https://x.com/FouadBechar' target='_parent'>
          <img class='im0im1' src='https://fouadbechar.x10.mx/p/m/image0105.webp' alt='image0105' width='30px' height='30px' />
        </a>
        <a class='loadicon010101' href='https://www.youtube.com/channel/UCi3RVanUvgW2o1Ld5lt7EjA' target='_parent'>
          <img class='im0im2' src='https://fouadbechar.x10.mx/p/m/youtb.webp' alt='image0105' width='43px' height='30px' />
        </a>
      </span>
      <div class='pr0101'><a href='p/v/pr' target='_parent'>Privacy Policy</a></div>
    </center>
  `
}

export default function ContentSections() {
  return (
    <div className="content-root">
      <div id="loading-icon010101" className="hidden010101">
        <div className="loader010"></div>
      </div>

      <div id="text1" dangerouslySetInnerHTML={{ __html: htmls.text1 }} />
      <div id="text2" dangerouslySetInnerHTML={{ __html: htmls.text2 }} />
      <div id="text3" dangerouslySetInnerHTML={{ __html: htmls.text3 }} />

      <div id="text10" className="ai-card-grid" dangerouslySetInnerHTML={{ __html: htmls.aiCardGrid }} />

      <div id="cookie-consent" role="dialog" aria-live="polite">
        <p id="cookie-message"></p>
        <div style={{ textAlign: 'center' }}>
          <button type="button" id="accept" title="accept"></button>
          <button type="button" id="decline" title="decline"></button>
        </div>
      </div>

      <div id="chat-box" style={{ display: 'none' }} />

      <div id="text11" className="foter" dangerouslySetInnerHTML={{ __html: htmls.footer }} />
    </div>
  )
}
