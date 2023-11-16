/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
export default function ProductImage({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <div className="flex justify-center">
        <img className="max-w-[100%] h-[300px]" src={activeImage} alt="" />
      </div>
      <div className="flex justify-center gap-5 mt-5">
        {images &&
          images.map((image, index) => {
            return (
              <div
                key={index}
                className={
                  activeImage == image
                    ? 'h-[60px] md:h-[80px] cursor-pointer p-1 md:p-2 rounded-md border-2 border-[#f53131] flex items-center justify-center'
                    : 'h-[60px] md:h-[80px] cursor-pointer p-1 md:p-2 rounded-md border-2 border-[#ccc] opacity-60 flex items-center justify-center'
                }
              >
                <img
                  className="max-w-full max-h-full"
                  src={image}
                  alt=""
                  onClick={() => setActiveImage(image)}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
