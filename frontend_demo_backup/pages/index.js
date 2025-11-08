import { useState, useEffect } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // restore session id if present
    const sid = localStorage.getItem('session_id')
    if (sid) setSessionId(sid)
  }, [])

  async function ask() {
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, query, region: 'pune', lang: 'en' })
      })
      const data = await res.json()
      setResponse(data)
      if (data.session_id) {
        setSessionId(data.session_id)
        localStorage.setItem('session_id', data.session_id)
      }
    } catch (e) {
      setResponse({ answer: 'Error contacting backend: ' + e.message, citations: [], confidence: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: 32, background: 'linear-gradient(180deg,#7A3EF2,#C6A7FF)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'white', padding: 24, borderRadius: 12 }}>
        <h1 style={{ marginTop: 0 }}>Localized GenAI — Demo Frontend (Mock)</h1>
        <p>Type a local query (e.g., "How to pay property tax in Pune?")</p>
        <textarea rows={3} style={{ width: '100%' }} value={query} onChange={e => setQuery(e.target.value)} />
        <div style={{ marginTop: 12 }}>
          <button onClick={ask} disabled={loading || !query} style={{ padding: '8px 16px' }}>
            {loading ? 'Asking...' : 'Ask'}
          </button>
          <button onClick={() => { setQuery(''); setResponse(null); }} style={{ marginLeft: 8 }}>
            Clear
          </button>
        </div>

        {response && (
          <div style={{ marginTop: 20 }}>
            <h3>Answer</h3>
            <div style={{ whiteSpace: 'pre-wrap', padding: 12, background: '#f7f7f7', borderRadius: 8 }}>{response.answer}</div>
            <p><strong>Confidence:</strong> {response.confidence}</p>
            <h4>Sources</h4>
            <ul>
              {(response.citations || []).map((c, i) => (
                <li key={i}><a href={c.url} target="_blank" rel="noreferrer">{c.title || c.url}</a> — <small>{c.snippet?.slice(0,120)}</small></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
