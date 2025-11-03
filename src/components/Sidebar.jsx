import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import { loadDB } from '../utils/storage' 
export default function Sidebar({ onSelectConv }) {
  const { db, createConversation } = useChat()
  const { user } = useAuth()
  const [q, setQ] = useState('')
  function getNameById(id) {
    const uu = (db.users || []).find(u => u.id === id)
    return uu ? uu.name : id
  }
  function convDisplayName(c) {
    if (c.name) return c.name
    const other = (c.participants || []).filter(p => p !== user.id)
    if (other.length === 0) {
      return 'Bạn'
    }
    return other.map(id => getNameById(id)).join(', ')
  }

  const convs = (db.conversations || []).slice().sort((a, b) => {
    const ta = a.messages?.[a.messages.length - 1]?.time || 0
    const tb = b.messages?.[b.messages.length - 1]?.time || 0
    return tb - ta
  })
  function startChatWith(u) {
    const conv = createConversation([user.id, u.id])
    onSelectConv(conv.id)
  }

  return (
    <div>
      <div className="mb-3">
        <input
          className="w-full rounded px-3 py-2"
          placeholder="Tìm conversation hoặc bạn"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="space-y-2 max-h-[55vh] overflow-auto">
        {convs
          .filter(c => {
            if (!q) return true
            const name = convDisplayName(c)
            return name.toLowerCase().includes(q.toLowerCase())
          })
          .map(c => (
            <div
              key={c.id}
              onClick={() => onSelectConv(c.id)}
              className="p-2 rounded hover:bg-white/30 cursor-pointer"
            >
              <div className="font-medium">{convDisplayName(c)}</div>
              <div className="text-xs text-gray-700">
                {c.messages?.[c.messages.length - 1]?.text || '...'}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold mb-2">Người dùng</div>
        {(db.users || []).map(u => (
          <div key={u.id} className="flex items-center justify-between mb-2">
            <div>{u.name}</div>
            <div>
              <button
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                onClick={() => startChatWith(u)}
              >
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
