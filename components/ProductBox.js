/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Button from './properties/Button';
import { useContext } from 'react';
import { Context } from './Context/ContextProvider';

export default function ProductBox({ product }) {
  const { addProduct } = useContext(Context);
  return (
    <div className="shadow-md pb-3 rounded-xl">
      <Link
        href={'/product/' + product._id}
        className="h-[200px] bg-white p-[20px] flex text-center items-center justify-center rounded-xl"
      >
        <div>
          <img
            className="max-w-[100%] max-h-[150px]"
            src={product.images?.[0]}
            alt={product.title}
          />
        </div>
      </Link>

      <div className="mt-5 p-3">
        <Link
          href={'/product/' + product._id}
          className="font-normal text-md text-inherit m-0"
        >
          {product.title}
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold">$ {product.price}</span>

          <div onClick={() => addProduct(product._id)}>
            <Button primary={true} outlined={true}>
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
