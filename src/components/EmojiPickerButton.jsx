import React, { useState } from 'react'
import { EMOJIS } from '../utils/mockData'


export default function EmojiPickerButton({ onPick }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setOpen(s => !s)} className="px-3 py-2 bg-white/80 rounded">😀</button>
            {open && (
                <div className="absolute bottom-12 left-0 bg-white p-2 rounded shadow grid grid-cols-8 gap-1 w-64 max-h-52 overflow-auto">
                    {EMOJIS.map(e => (<button key={e} onClick={() => { onPick(e); setOpen(false); }} className="p-1 text-lg">{e}</button>))}
                </div>
            )}
        </div>
    )
}