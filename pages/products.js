import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function ProductsPage({ products }) {
  return (
    <section>
      <Header />
      <Center>
        <div className="p-5 md:p-0">
          <h1 className="title mt-[100px]">All Products</h1>
          <ProductGrid products={products} />
        </div>
      </Center>
    </section>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
