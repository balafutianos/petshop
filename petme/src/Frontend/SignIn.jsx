// src/Frontend/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setBusy(true);
      await signInWithEmailAndPassword(auth, email, pw);
      navigate(state?.from?.pathname || "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    try {
      setBusy(true);
      await signInWithPopup(auth, googleProvider);
      navigate(state?.from?.pathname || "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main style={{ maxWidth: 420, margin: "120px auto 40px", background: "#fff", padding: 20, borderRadius: 12 }}>
      <h2>Σύνδεση</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Κωδικός" value={pw} onChange={(e)=>setPw(e.target.value)} required />
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <button disabled={busy} type="submit">Σύνδεση</button>
      </form>

      <button onClick={signInWithGoogle} disabled={busy} style={{ marginTop: 10, width: "100%" }}>
        Συνέχεια με Google
      </button>

      <p style={{ marginTop: 12 }}>
        Νέος χρήστης; <Link to="/signup">Εγγραφή</Link>
      </p>
    </main>
  );
};

export default SignIn;
