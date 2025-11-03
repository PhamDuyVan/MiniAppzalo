import React, { createContext, useContext, useState, useEffect } from 'react'
import { loadDB, saveDB } from '../utils/storage'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('mini_zalo_user')) || null);
    useEffect(() => { if (user) localStorage.setItem('mini_zalo_user', JSON.stringify(user)); else localStorage.removeItem('mini_zalo_user'); }, [user]);
    function mockGoogleSignIn() {
        const u = { id: 'u' + Date.now(), name: 'Người Dùng', email: 'user@example.com', bio: 'Hello!', status: 'online', avatarColor: 'bg-blue-400' };
        const db = loadDB();
        db.users.push(u);
        saveDB(db);
        setUser(u);
    }
    function logout() { setUser(null); }
    return (
        <AuthContext.Provider value={{ user, setUser, mockGoogleSignIn, logout }}>{children}</AuthContext.Provider>
    )
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);