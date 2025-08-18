// src/Frontend/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  applyActionCode,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  // When the page opens from the email link, it has ?mode=verifyEmail&oobCode=...
  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const mode = params.get("mode");
    const oobCode = params.get("oobCode");
    const continueUrl = params.get("continueUrl");

    const run = async () => {
      if (mode === "verifyEmail" && oobCode) {
        try {
          setBusy(true);
          await applyActionCode(auth, oobCode);       // mark email as verified
          await reload(auth.currentUser);             // refresh local user
          setDone(true);
          setMsg("Το email επαληθεύτηκε με επιτυχία!");
          setTimeout(() => {
            navigate(continueUrl || "/", { replace: true });
          }, 1200);
        } catch (e) {
          setMsg(e.message || "Αποτυχία επαλήθευσης.");
        } finally {
          setBusy(false);
        }
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.search]);

  const resend = async () => {
    if (!user) return setMsg("Δεν βρέθηκε χρήστης.");
    try {
      setBusy(true);
      await sendEmailVerification(user, {
        url: `${window.location.origin}/verify`,
        handleCodeInApp: true,
      });
      setMsg("Στάλθηκε νέο email επαλήθευσης.");
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  const check = async () => {
    if (!user) return setMsg("Δεν βρέθηκε χρήστης.");
    try {
      setBusy(true);
      await reload(user);
      if (auth.currentUser?.emailVerified) {
        navigate("/", { replace: true });
      } else {
        setMsg("Δεν έχει επαληθευτεί ακόμα. Έλεγξε Inbox/Spam.");
      }
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main style={{ maxWidth: 520, margin: "120px auto", background: "#fff", padding: 20, borderRadius: 12 }}>
      <h2>Επαλήθευση Email</h2>
      {!done && (
        <p>Άνοιξε τον σύνδεσμο στο email για να ολοκληρώσεις την επαλήθευση.
        Αν έφτασες εδώ από το email, η επαλήθευση θα γίνει αυτόματα.</p>
      )}

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <button onClick={resend} disabled={busy}>Στείλε ξανά</button>
        <button onClick={check} disabled={busy}>Έκανα verify — έλεγχος</button>
      </div>

      {busy && <p style={{ marginTop: 10 }}>Επεξεργασία…</p>}
      {msg && <p style={{ marginTop: 12, color: done ? "#0a7" : "crimson" }}>{msg}</p>}
    </main>
  );
}
