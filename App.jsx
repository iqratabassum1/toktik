import React, { useEffect, useState } from 'react'
import { fetchLatestVideos, searchVideos, postComment, rateVideo } from './api'
import VideoPlayer from './components/VideoPlayer'

export default function App(){
  const [videos, setVideos] = useState([])
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(()=>{ fetchLatestVideos().then(setVideos) },[])

  const onSearch = async (e)=>{ e.preventDefault(); setVideos(await searchVideos(q)) }
  const onComment = async ()=>{ if(!selected) return; const ok = await postComment(selected.id, comment); if(ok) setComment(''); alert(ok? 'Comment posted (or simulated)':'Failed'); }
  const onRate = async (r)=>{ if(!selected) return; const ok = await rateVideo(selected.id, r); alert(ok? 'Thanks!':'Failed'); }

  return (
    <div className="container">
      <header>
        <h1>TokTik</h1>
        <form onSubmit={onSearch} className="search">
          <input placeholder="Search videos…" value={q} onChange={e=>setQ(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </header>
      <main className="grid">
        <section className="sidebar">
          <h2>Latest</h2>
          <ul className="video-list">
            {videos.map(v=> (
              <li key={v.id} onClick={()=>setSelected(v)} className={selected?.id===v.id? 'active':''}>
                <div className="title">{v.title}</div>
                <div className="meta">{v.publisher} • {v.genre} • {v.age_rating}</div>
              </li>
            ))}
          </ul>
        </section>
        <section className="player">
          {selected? (
            <>
              <h2>{selected.title}</h2>
              <VideoPlayer src={selected.hls_url} />
              <div className="actions">
                <button onClick={()=>onRate(1)}>👍</button>
                <button onClick={()=>onRate(-1)}>👎</button>
              </div>
              <div className="comment-box">
                <input placeholder="Write a comment…" value={comment} onChange={e=>setComment(e.target.value)} />
                <button onClick={onComment}>Post</button>
              </div>
            </>
          ): <p>Select a video from the list.</p>}
        </section>
      </main>
      <footer>
        <small>Demo app for coursework — React + Vite. Set VITE_API_BASE_URL to your backend URL.</small>
      </footer>
    </div>
  )
}
