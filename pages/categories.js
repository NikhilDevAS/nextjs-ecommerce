import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CategoriesPage({ products }) {
  const [categoryProducts, setCategoryProducts] = useState(null);
  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  async function fetchCategoryProducts() {
    const response = await axios.get('/api/catproducts');
    setCategoryProducts(response.data);
  }
  return (
    <section>
      <Header />
      <Center>
        <div className="mt-[100px]">
          <h1 className="title">Categories</h1>
          {categoryProducts &&
            categoryProducts.map((category, index) => {
              if (category.products.length > 0) {
                return (
                  <div key={index} className="mb-5">
                    <div className="underline flex justify-between items-center">
                      <h2 className="text-xl font-bold">{category.name}s</h2>
                      <Link href={'/category/' + category._id}>
                        Show More Products
                      </Link>
                    </div>
                    <div className="mt-5">
                      <ProductGrid products={category.products} />
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Center>
    </section>
  );
}

// export async function getServerSideProps() {
//   await axios.get('/api/catproducts');
//   return {
//     props: {
//       products: 'nisdf',
//     },
//   };
// }
