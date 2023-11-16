import { useRouter } from 'next/router';
import Center from './Center';
import Button from './properties/Button';
import { useContext } from 'react';
import { Context } from './Context/ContextProvider';

export default function Featured({ product }) {
  const { addProduct } = useContext(Context);
  const router = useRouter();
  return (
    <section className="bg-[#222] text-white py-[50px] px-0">
      <Center>
        <div className="grid md:grid-cols-2 gap-0 pt-[50px]">
          <div className="flex items-center order-2 md:order-none">
            <div>
              <h1 className="text-5xl font-normal mb-5">{product?.title}</h1>
              <p className="font-[0.8rem] text-[#aaa] mb-5">
                {product?.description}
              </p>
              <div className="flex gap-5">
                <div onClick={() => router.push('/product/' + product._id)}>
                  <Button link={true}>Read more</Button>
                </div>
                <div onClick={() => addProduct(product._id)}>
                  <Button white={true}>
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
          <div className="flex items-center justify-center">
            <img
              className="m-5 w-100%"
              src={product?.images?.[0]}
              alt={product?.title}
            />
          </div>
        </div>
      </Center>
    </section>
  );
}
