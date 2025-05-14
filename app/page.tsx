interface ProductPageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>; // אופציונלי, אם תשתמשי בו
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.id;

  // ... המשך הקוד שלך כאן ...
}
