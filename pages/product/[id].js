/* eslint-disable @next/next/no-img-element */
import Center from '@/components/Center';
import { Context } from '@/components/Context/ContextProvider';
import Header from '@/components/Header';
import ProductImage from '@/components/ProductImage';
import Button from '@/components/properties/Button';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useContext } from 'react';

export default function ProductPage({ product }) {
  const { addProduct } = useContext(Context);
  let sum = 0;

  if (product.reviews) {
    sum =
      product.reviews.reduce((accumulator, object) => {
        return accumulator + object.rating;
      }, 0) / product.reviews.length;
  }
  return (
    <section>
      <Header />
      <Center>
        <div className="md:flex gap-1 mt-[100px]">
          <div className=" md:w-[40%] bg-white p-5 rounded-lg">
            <ProductImage images={product?.images} />
          </div>
          <div className=" w-[60%] p-5">
            <h2 className="text-xl md:text-3xl">{product.title}</h2>
            <div className="flex gap-1 items-center my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-xl">{isNaN(sum) ? 0 : sum.toFixed(1)}</p>
            </div>
            <p className="mt-4 text-md text-gray-500">{product.description}</p>
            <div className="mt-5">
              {product.properties &&
                Object.keys(product.properties).map((key, index) => {
                  return (
                    <div key={index}>
                      <h2 className="my-5">
                        {key}: {product.properties[key]}
                      </h2>
                    </div>
                  );
                })}
            </div>
            <div className="mt-4 flex gap-2 items-center justify-between md:justify-normal">
              <div className="text-xl">$ {product.price}</div>
              <div onClick={() => addProduct(product._id)}>
                <Button primary={true}>
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="title mt-5">Reviews</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
          {product &&
            product.reviews &&
            product.reviews.map((review) => {
              return (
                <div
                  key={review._id}
                  className="w-full p-5 bg-white rounded-md shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.image}
                        className="w-[45px] h-[45px] rounded-full"
                        alt=""
                      />
                      <h3 className="text-lg">{review.name}</h3>
                    </div>
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-yellow-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <div className="text-md text-gray-500 font-normal border-t-2 mt-2">
                    {review.comment}
                  </div>
                </div>
              );
            })}

          {product.reviews && product.reviews.length === 0 && (
            <div>
              <p className="text-xl text-gray-400">No Reviews Found!</p>
            </div>
          )}
        </div>
      </Center>
    </section>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
