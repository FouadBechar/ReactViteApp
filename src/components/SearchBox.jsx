import React, { useEffect, useRef, useState } from 'react'
import useSearch from '../hooks/useSearch'

export default function SearchBox() {
  const { getSuggestions, addHistory } = useSearch()
  const [value, setValue] = useState('')
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef = useRef(null)
  const boxRef = useRef(null)

  useEffect(() => {
    const handler = async () => {
      if (!value.trim()) {
        setItems([])
        setOpen(false)
        return
      }
      const s = await getSuggestions(value)
      setItems(s)
      setActive(-1)
      setOpen(Boolean(s && s.length))
    }
    const t = setTimeout(handler, 120)
    return () => clearTimeout(t)
  }, [value, getSuggestions])

  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target) && inputRef.current && e.target !== inputRef.current) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  function selectItem(item) {
    if (!item) return
    setValue(item.text)
    setOpen(false)
    addHistory(item.text)
    if (item.type === 'page' && item.url) {
      window.location.href = item.url
    } else if (item.type === 'google') {
      window.open('https://www.google.com/search?q=' + encodeURIComponent(item.text), '_blank')
    }
  }

  function onKeyDown(e) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault(); if (active > -1) selectItem(items[active])
      else selectItem({ type: 'query', text: value })
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="search-box" id="searchBox" role="search" ref={boxRef}>
      <form className="search-form" onSubmit={(e) => { e.preventDefault(); selectItem({ type: 'query', text: value }); }}>
        <input
          ref={inputRef}
          id="searchInput"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search..."
          aria-label="Search"
          autoComplete="off"
        />
        <button type="button" className="clear-btn" onClick={() => { setValue(''); inputRef.current?.focus(); }} aria-label="Delete">×</button>
        <button type="submit" title="Search">🔎</button>
      </form>

      <div id="suggestions" className="results-dropdown" role="listbox" aria-expanded={open} style={{ display: open ? 'block' : 'none' }}>
        {items.map((it, idx) => (
          <div key={idx} className={`suggestion-item ${it.type}`} role="option" aria-selected={active === idx} onMouseDown={(e) => { e.preventDefault(); selectItem(it); }}>
            <span>{it.text}</span>
            {it.type === 'history' && <button className="delete-btn" type="button" aria-label="Remove">✕</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
