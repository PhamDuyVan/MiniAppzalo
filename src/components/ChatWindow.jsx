import React, { useEffect, useRef, useState } from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import MessageBubble from './MessageBubble'
import EmojiPickerButton from './EmojiPickerButton'
import FileUploader from './FileUploader'

export default function ChatWindow({ convId, onSetConv }) {
  const { db, sendMessage, createConversation } = useChat()
  const { user } = useAuth()
  const [text, setText] = useState('')
  const [attached, setAttached] = useState([])
  const ref = useRef()

  const conv = (db.conversations || []).find(c => c.id === convId)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [conv?.messages?.length])

  function getNameById(id) {
    const uu = (db.users || []).find(u => u.id === id)
    return uu ? uu.name : id
  }

  function convDisplayName(c) {
    if (!c) return ''
    if (c.name) return c.name
    const others = (c.participants || []).filter(p => p !== user.id)
    if (others.length === 0) return 'Bạn'
    return others.map(id => getNameById(id)).join(', ')
  }

  function handleSend() {
    if (!conv) {
      const c = createConversation([user.id], 'Nhóm mới')
      onSetConv(c.id)
      return
    }
    sendMessage(conv.id, { text: text || null, files: attached })
    setText('')
    setAttached([])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b pb-2 mb-2 flex items-center justify-between">
        <div className="font-semibold">{conv ? convDisplayName(conv) : 'Chọn conversation'}</div>
        <div className="text-xs text-gray-600">Auto-refresh mỗi 3s</div>
      </div>

      <div ref={ref} className="flex-1 overflow-auto p-3 bg-white/60 rounded">
        {conv ? (
          conv.messages.map(m => <MessageBubble key={m.id} m={m} meId={user.id} />)
        ) : (
          <div className="text-gray-700">Không có conversation</div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2">
          <EmojiPickerButton onPick={e => setText(t => t + e)} />
          <FileUploader onFiles={files => setAttached(f => [...f, ...files])} />
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Nhập tin nhắn..."
            className="flex-1 rounded px-3 py-2"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSend}>
            Gửi
          </button>
        </div>
        {attached.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-auto">
            {attached.map((a, i) => (
              <div key={i} className="p-2 border rounded text-xs">
                {a.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
