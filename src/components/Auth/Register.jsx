import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name,
        email,
      });
    } catch (err) {
      setError("Không thể tạo tài khoản");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-purple-400 to-blue-400">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl p-6 w-80 shadow-lg flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold text-center">Đăng ký</h2>
        <input
          placeholder="Tên hiển thị"
          className="border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="bg-blue-600 text-white py-2 rounded">Đăng ký</button>
        <p className="text-center text-sm">
          Đã có tài khoản?{" "}
          <span onClick={onSwitch} className="text-blue-600 cursor-pointer">
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
}
