import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/models/Product';
import { useRouter } from 'next/router';

export default function SearchResultPage({ products }) {
  const router = useRouter();
  const { data } = router.query;
  return (
    <>
      <Header />
      <Center>
        <div className="p-5 md:p-0">
          <h1 className="title mt-[100px]">Search For &quot; {data} &quot;</h1>
          {products && products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="w-full flex justify-center items-center">
              <p className="text-xl text-gray-400 font-bold flex gap-2 items-center">
                <span>Products Not Found</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </p>
            </div>
          )}
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(Context) {
  const { data } = Context.query;
  //   db.products.find({ description: { $regex: /S/ } });

  const result = await Product.find({
    $or: [{ title: { $regex: data, $options: 'i' } }],
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(result)),
    },
  };
}
