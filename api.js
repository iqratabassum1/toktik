import { API_BASE_URL } from './config'

const mockVideos = [
  { id: "1", title: "Welcome to TokTik", publisher: "admin", genre: "Demo", age_rating: "PG", hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", created_at: new Date().toISOString() }
];

export async function fetchLatestVideos(){
  if(!API_BASE_URL) return mockVideos;
  try{ const res = await fetch(`${API_BASE_URL}/videos`); if(!res.ok) throw new Error(); return await res.json(); }
  catch(e){ console.warn('Falling back to mock data'); return mockVideos; }
}

export async function searchVideos(q){
  if(!API_BASE_URL) return mockVideos.filter(v=>v.title.toLowerCase().includes(q.toLowerCase()));
  try{ const res = await fetch(`${API_BASE_URL}/videos/search?q=${encodeURIComponent(q)}`); if(!res.ok) throw new Error(); return await res.json(); }
  catch(e){ return mockVideos.filter(v=>v.title.toLowerCase().includes(q.toLowerCase())); }
}

export async function postComment(id, text){
  if(!API_BASE_URL) return { ok:true };
  const res = await fetch(`${API_BASE_URL}/videos/${id}/comments`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text }) });
  return res.ok;
}

export async function rateVideo(id, rating){
  if(!API_BASE_URL) return { ok:true };
  const res = await fetch(`${API_BASE_URL}/videos/${id}/rate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ rating }) });
  return res.ok;
}
