import { useCallback } from "react";

export default function useFavoritesBucket() {
  const addToLocalList = (key, item) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    // μην διπλο-βάζεις ίδιο id
    if (!arr.find((x) => x.id === item.id)) {
      arr.push(item);
      localStorage.setItem(key, JSON.stringify(arr));
    }
  };

  const removeFromLocalList = (key, id) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    const next = arr.filter((x) => x.id !== id);
    localStorage.setItem(key, JSON.stringify(next));
  };

  const isInList = (key, id) => {
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    return arr.some((x) => x.id === id);
  };

  const addToBucket = useCallback((item) => addToLocalList("bucket", item), []);
  const toggleFavorite = useCallback((item) => {
    if (isInList("favorites", item.id)) removeFromLocalList("favorites", item.id);
    else addToLocalList("favorites", item);
  }, []);
  const isFavorite = useCallback((id) => isInList("favorites", id), []);

  return { addToBucket, toggleFavorite, isFavorite };
}
