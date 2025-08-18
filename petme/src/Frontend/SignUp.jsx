// src/Frontend/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [pw,        setPw]        = useState("");
  const [pw2,       setPw2]       = useState("");
  const [error,     setError]     = useState("");
  const [busy,      setBusy]      = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const fn = firstName.trim();
    const ln = lastName.trim();
    if (!fn || !ln) return setError("Συμπλήρωσε Όνομα και Επίθετο.");
    if (pw !== pw2) return setError("Οι κωδικοί δεν ταιριάζουν.");
    if (pw.length < 6) return setError("Ο κωδικός πρέπει να έχει ≥ 6 χαρακτήρες.");

    try {
      setBusy(true);

      // Δημιουργία λογαριασμού
      const cred = await createUserWithEmailAndPassword(auth, email, pw);

      // Ορατό όνομα παντού
      await updateProfile(cred.user, { displayName: `${fn} ${ln}`.trim() });

      // Στείλε email επαλήθευσης — ο σύνδεσμος επιστρέφει εδώ
      await sendEmailVerification(cred.user, {
        url: `${window.location.origin}/verify`,
        handleCodeInApp: true,
      });

      // Σελίδα οδηγιών επαλήθευσης
      navigate("/verify", { replace: true, state: { from: state?.from } });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const signUpWithGoogle = async () => {
    setError("");
    try {
      setBusy(true);
      const { user } = await signInWithPopup(auth, googleProvider);

      // Αν για κάποιο λόγο ο Google λογαριασμός δεν είναι verified, στείλε email verify
      if (!user?.emailVerified) {
        await sendEmailVerification(user, {
          url: `${window.location.origin}/verify`,
          handleCodeInApp: true,
        });
        navigate("/verify", { replace: true, state: { from: state?.from } });
      } else {
        navigate(state?.from?.pathname || "/", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "120px auto 40px",
        background: "#fff",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <h2>Δημιουργία λογαριασμού</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input
          type="text"
          placeholder="Όνομα"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Επίθετο"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Κωδικός"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Επιβεβαίωση κωδικού"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          required
        />

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button disabled={busy} type="submit">Εγγραφή</button>
      </form>

      <button
        onClick={signUpWithGoogle}
        disabled={busy}
        style={{ marginTop: 10, width: "100%" }}
      >
        Συνέχεια με Google
      </button>

      <p style={{ marginTop: 12 }}>
        Έχεις ήδη λογαριασμό; <Link to="/signin">Σύνδεση</Link>
      </p>
    </main>
  );
};

export default SignUp;
