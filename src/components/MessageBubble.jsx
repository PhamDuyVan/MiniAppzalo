import React from 'react'
import { useChat } from '../context/ChatContext'
import { loadDB } from '../utils/storage'


export default function MessageBubble({ m, meId }) {
  const db = loadDB();
  const from = db.users.find(u => u.id === m.from) || { name: m.from };
  const mine = m.from === meId;
  return (
    <div className={`mb-3 flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] p-3 rounded-xl ${mine ? 'bg-blue-600 text-white' : 'bg-white/90 text-gray-900'}`}>
        <div className="text-sm">{m.text}</div>
        {m.files && m.files.map((f, idx) => (
          <div key={idx} className="mt-2">{f.type === 'image' ? <img src={f.dataUrl} alt={f.name} className="max-w-full rounded" /> : <a className="text-xs underline" href={f.dataUrl}>{f.name}</a>}</div>
        ))}
        <div className="text-[10px] mt-1 text-gray-300 text-right">{new Date(m.time).toLocaleString()} {m.seenBy && m.seenBy.length > 1 ? '✓✓' : (m.seenBy && m.seenBy.includes(meId) ? '✓' : '')}</div>
      </div>
    </div>
  )
}