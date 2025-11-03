import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { mockGoogleSignIn } = useAuth();
    return (
        <div className="p-8 flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold">Mini Zalo - Demo</h2>
            <p className="text-sm text-gray-600">Đăng nhập nhanh (mock Google)</p>
            <button onClick={mockGoogleSignIn} className="px-6 py-3 bg-blue-600 text-white rounded">Đăng nhập bằng Google</button>
        </div>
    )
}