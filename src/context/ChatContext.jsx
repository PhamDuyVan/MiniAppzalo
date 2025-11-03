import React, { createContext, useContext, useState, useEffect } from 'react'
import { loadDB, saveDB } from '../utils/storage'
import { useAuth } from './AuthContext'

const ChatContext = createContext();
export function ChatProvider({ children }) {
    const { user } = useAuth();
    const [db, setDb] = useState(() => loadDB());
    useEffect(() => {
        const iv = setInterval(() => { setDb(loadDB()); }, 3000);
        return () => clearInterval(iv);
    }, []);
    function persist(newDb) { saveDB(newDb); setDb(newDb); }
    function createConversation(participants, name = null) {
        const newDb = loadDB();
        const conv = { id: 'c' + Date.now(), participants, name, messages: [] };
        newDb.conversations.push(conv);
        persist(newDb);
        return conv;
    }
    function sendMessage(convId, payload) {
        const newDb = loadDB();
        const conv = newDb.conversations.find(c => c.id === convId);
        if (!conv) return;
        const msg = { id: 'm' + Date.now(), from: user.id, text: payload.text || null, time: Date.now(), files: payload.files || [], seenBy: [user.id] };
        conv.messages.push(msg);
        persist(newDb);
        return msg;
    }
    function addFriend(userId) { const newDb = loadDB(); newDb.friendships[user.id] = newDb.friendships[user.id] || []; if (!newDb.friendships[user.id].includes(userId)) newDb.friendships[user.id].push(userId); persist(newDb); }
    return (
        <ChatContext.Provider value={{ db, createConversation, sendMessage, addFriend }}>{children}</ChatContext.Provider>
    )
}
export const useChat = () => useContext(ChatContext);