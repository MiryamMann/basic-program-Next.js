interface Product {
  id: string;
  name: string;
  description: string;
}

interface ProductPageProps {
  params: { id: string };
}

async function getProduct(id: string): Promise<Product | undefined> {
  const res = await fetch("http://localhost:3000/api/products?q=", {
    cache: "no-store",
  });
  const products: Product[] = await res.json();
  return products.find((p) => p.id === id);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) return <h1 className="p-10 text-red-600 text-xl">Product Not Found</h1>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
