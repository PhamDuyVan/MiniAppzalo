import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'


export default function ProfileModal({ open, onClose }) {
    const { user, setUser, logout } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
            <div className="bg-white rounded p-6 z-50 w-[90%] max-w-lg">
                <h3 className="font-bold mb-3">Profile</h3>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded px-3 py-2 mb-2" />
                <input value={bio} onChange={e => setBio(e.target.value)} className="w-full rounded px-3 py-2 mb-4" />
                <div className="flex gap-2">
                    <button onClick={() => { setUser({ ...user, name, bio }); onClose(); }} className="flex-1 py-2 bg-blue-600 text-white rounded">Lưu</button>
                    <button onClick={() => { logout(); }} className="flex-1 py-2 bg-gray-200 rounded">Đăng xuất</button>
                </div>
            </div>
        </div>
    )
}