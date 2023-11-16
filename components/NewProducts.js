import Center from './Center';
import ProductGrid from './ProductGrid';

export default function NewProducts({ products }) {
  return (
    <Center>
      <h1 className="title">New Arrivals</h1>
      <ProductGrid products={products} />
    </Center>
  );
}
