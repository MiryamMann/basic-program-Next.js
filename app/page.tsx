'use client';
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // ודאי שהנתיב נכון
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const search = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🔍 Product Search</h1>

      <div className="flex justify-center mb-6 gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 w-64"
          placeholder="Search products..."
        />
        <button
          onClick={search}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="space-y-4 max-w-xl mx-auto">
          {results.map((p) => (
            <li key={p.id} className="border p-4 rounded shadow">
              <Link href={`/products/${p.id}`}>
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-gray-600">{p.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
