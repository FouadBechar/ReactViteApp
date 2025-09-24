import React from 'react'
import SearchBox from './SearchBox'

export default function NavBar() {
  return (
    <nav role="navigation" aria-label="Main navigation" className="nav-root">
      <div className="nav-inner">
        <div className="logo" aria-label="Logos">
          <a href="https://fouadbechar.x10.mx/" aria-label="FouadBechar">
            <img src="/p/m/incon01.png" alt="icon" />
          </a>
        </div>
        <div className="nav-menu" id="navMenu">
          <ul id="navLinks">
            <li className="has-dropdown"><div className="item-row"><a href="#" className="top-link">Organizations</a></div></li>
            <li className="has-dropdown"><div className="item-row"><a href="#" className="top-link">Culture</a></div></li>
            <li className="has-dropdown"><div className="item-row"><a href="#" className="top-link">Computer</a></div></li>
            <li className="has-dropdown"><div className="item-row"><a href="#" className="top-link">Games</a></div></li>
            <li className="has-dropdown account-item"><div className="item-row"><a href="#" className="top-link" title="Register">Account</a></div></li>
          </ul>

          {/* Search box integrated into nav */}
          <SearchBox />
        </div>
      </div>
    </nav>
  )
}
