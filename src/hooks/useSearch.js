import { useEffect, useRef, useState } from 'react'

export default function useSearch() {
  const [siteIndex, setSiteIndex] = useState([])
  const [history, setHistory] = useState([])
  const googlePendingRef = useRef(null)

  useEffect(() => {
    // load pages.json from original site
    fetch('https://fouadbechar.x10.mx/p/pages.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setSiteIndex(data))
      .catch(() => {})

    try {
      const h = JSON.parse(localStorage.getItem('searchHistory') || '[]')
      if (Array.isArray(h)) setHistory(h)
    } catch (e) {}
  }, [])

  function saveHistory(arr) {
    setHistory(arr)
    try {
      localStorage.setItem('searchHistory', JSON.stringify(arr))
    } catch (e) {}
  }

  function addHistory(q) {
    const query = (q || '').trim().toLowerCase()
    if (!query) return
    const next = [query, ...history.filter((h) => h !== query)].slice(0, 6)
    saveHistory(next)
  }

  function filterSite(q) {
    const s = (q || '').toLowerCase()
    return siteIndex
      .filter((p) => (p.title || '').toLowerCase().includes(s))
      .slice(0, 6)
  }

  function filterHistory(q) {
    const s = (q || '').toLowerCase()
    return history
      .filter((h) => h.startsWith(s))
      .slice(0, 4)
      .map((t) => ({ type: 'history', text: t }))
  }

  function fetchGoogleSuggestions(query) {
    return new Promise((resolve) => {
      // cleanup old
      if (googlePendingRef.current) {
        const old = document.getElementById(googlePendingRef.current)
        if (old) old.remove()
        googlePendingRef.current = null
      }
      const id = 'jsonp-g-' + Date.now()
      googlePendingRef.current = id
      const script = document.createElement('script')
      script.id = id
      const cbName = 'handleGoogleSuggestions_' + id
      window[cbName] = function (data) {
        try {
          if (!Array.isArray(data) || !data[1] || !data[1].length) {
            resolve([])
            return
          }
          const suggestions = data[1].map((s) => ({ type: 'google', text: String(s) }))
          resolve(suggestions)
        } catch (e) {
          resolve([])
        } finally {
          // cleanup
          setTimeout(() => {
            const el = document.getElementById(id)
            if (el) el.remove()
            try {
              delete window[cbName]
            } catch (e) {}
          }, 2000)
        }
      }
      script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&callback=${cbName}`
      script.onerror = () => {
        resolve([])
        try {
          delete window[cbName]
        } catch (e) {}
      }
      document.body.appendChild(script)
      // auto cleanup guard
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.remove()
        if (googlePendingRef.current === id) googlePendingRef.current = null
      }, 8000)
    })
  }

  async function getSuggestions(q) {
    if (!q || !q.trim()) return []
    const siteMatches = filterSite(q).map((p) => ({ type: 'page', text: p.title, url: p.url }))
    const siteTitles = new Set(siteMatches.map((m) => m.text.toLowerCase()))
    const histMatches = filterHistory(q).filter((h) => !siteTitles.has(h.text.toLowerCase()))
    const combined = [...siteMatches, ...histMatches]
    if (combined.length) return combined
    // fallback to google
    const google = await fetchGoogleSuggestions(q)
    return google
  }

  return { getSuggestions, addHistory, history }
}
