'use client';
import { useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // או "@/lib/firebase" אם זה עובד אצלך

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const search = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const filtered = items.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">🔍 Product Search</h1>

        <div className="flex gap-2 mb-6 justify-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a product name..."
            className="px-4 py-2 border rounded w-64"
          />
          <button
            onClick={search}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Search
          </button>
        </div>

        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${p.id}`}
                  className="block bg-white p-4 rounded shadow hover:shadow-lg"
                >
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-500">₪{p.price}</div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center">No products found</p>
        )}
      </div>
    </div>
  );
}
