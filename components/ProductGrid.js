import ProductBox from './ProductBox';

export default function ProductGrid({ products }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products &&
        products.map((product) => {
          return <ProductBox key={product._id} product={product} />;
        })}
    </div>
  );
}
