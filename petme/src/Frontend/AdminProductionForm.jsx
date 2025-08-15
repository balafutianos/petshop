import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminProductForm = () => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    lifeStage: "Ενήλικη",
    type: "Ξηρά",
    rating: 4.8,
    category: "cat-food",
    active: true,
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Διάλεξε εικόνα προϊόντος.");

    setSaving(true);
    try {
      // 1) ανέβασμα εικόνας
      const filename = `products/${Date.now()}-${file.name}`;
      const fileRef = ref(storage, filename);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);

      // 2) αποθήκευση εγγράφου
      await addDoc(collection(db, "products"), {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Το προϊόν καταχωρήθηκε!");
      setForm({
        title: "", brand: "", price: "", lifeStage: "Ενήλικη", type: "Ξηρά",
        rating: 4.8, category: "cat-food", active: true,
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Κάτι πήγε στραβά.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ background:"#fff", padding:16, borderRadius:12 }}>
      <h3>Νέο προϊόν</h3>

      <input name="title" placeholder="Τίτλος" value={form.title} onChange={onChange} required />
      <input name="brand" placeholder="Μάρκα" value={form.brand} onChange={onChange} required />
      <input name="price" type="number" step="0.01" placeholder="Τιμή" value={form.price} onChange={onChange} required />
      <select name="lifeStage" value={form.lifeStage} onChange={onChange}>
        <option>Γατάκι</option><option>Ενήλικη</option><option>Ηλικιωμένη</option>
      </select>
      <select name="type" value={form.type} onChange={onChange}>
        <option>Ξηρά</option><option>Υγρή</option>
      </select>
      <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={onChange} />
      <input name="category" value={form.category} onChange={onChange} />
      <label>Εικόνα: <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} /></label>

      <button disabled={saving} type="submit">{saving ? "Αποθήκευση..." : "Αποθήκευση"}</button>
    </form>
  );
};

export default AdminProductForm;
