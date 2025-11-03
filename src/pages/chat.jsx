import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'

export default function Chat() {
    const [activeConvId, setActiveConvId] = useState(null);
    return (
        <div className="flex h-[80vh]">
            <div className="w-80 border-r p-3 glass">
                <Sidebar onSelectConv={(id) => setActiveConvId(id)} />
            </div>
            <div className="flex-1 p-3">
                <ChatWindow convId={activeConvId} onSetConv={(id) => setActiveConvId(id)} />
            </div>
        </div>
    )
}