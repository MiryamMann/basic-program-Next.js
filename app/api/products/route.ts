export const dynamic = 'force-dynamic'; // מבטיח שה-API ירוץ כל פעם מחדש

const products = [
  { id: "1", name: "Laptop", description: "Fast and lightweight" },
  { id: "2", name: "Smartphone", description: "High-resolution screen" },
  { id: "3", name: "Headphones", description: "Noise-cancelling" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(q)
  );
  return Response.json(filtered);
}
