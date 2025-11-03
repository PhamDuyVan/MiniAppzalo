import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Sai email hoặc mật khẩu");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-blue-300 to-purple-400">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl p-6 w-80 shadow-lg flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold text-center">Đăng nhập</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-blue-600 text-white py-2 rounded">Đăng nhập</button>
        <p className="text-center text-sm">
          Chưa có tài khoản?{" "}
          <span onClick={onSwitch} className="text-blue-600 cursor-pointer">
            Đăng ký
          </span>
        </p>
      </form>
    </div>
  );
}
