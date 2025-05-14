'use client';
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);

  const search = async () => {
    const res = await fetch(`/api/products?q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <button onClick={search}>Search</button>

      <ul>
        {results.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
