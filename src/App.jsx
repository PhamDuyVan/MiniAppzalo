import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import Login from './pages/Login'
import Chat from './pages/Chat'
import { useAuth } from './context/AuthContext'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ChatApp from "./components/ChatApp";

export default function App() {
    return (
        <AuthProvider>
            <ChatProvider>
                <Root />
            </ChatProvider>
        </AuthProvider>
    )
}
function Root() {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white/90 rounded-2xl shadow-xl overflow-hidden">
                {user ? <Chat /> : <Login />}
            </div>
        </div>
    )
}
export default function App() {
  const { user, logout } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  if (!user) {
    return isRegister ? (
      <Register onSwitch={() => setIsRegister(false)} />
    ) : (
      <Login onSwitch={() => setIsRegister(true)} />
    );
  }
  return (
    <div>
      <div className="flex justify-between bg-blue-600 text-white p-2">
        <p>Xin chào, {user.displayName || user.email}</p>
        <button onClick={logout} className="bg-white text-blue-600 px-3 rounded">
          Đăng xuất
        </button>
      </div>
      <ChatApp />
    </div>
  );
}