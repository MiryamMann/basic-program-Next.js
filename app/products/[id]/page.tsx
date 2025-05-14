interface Product {
  id: string;
  name: string;
  description: string;
}

async function getProduct(id: string): Promise<Product | undefined> {
  const res = await fetch("http://localhost:3000/api/products?q=", {
    cache: "no-store",
  });
  const products: Product[] = await res.json();
  return products.find((p) => p.id === id);
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return <h1>Product Not Found</h1>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
