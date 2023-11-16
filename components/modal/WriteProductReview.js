import axios from 'axios';
import React, { useState } from 'react';
import Rating from '../Rating';
// import Rating from 'react-star-rating-component';

export default function WriteProductReview({
  showWirteReview,
  productInfo,
  setShowWriteReview,
  setReviewedInfo,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  // const handleStarClick = (nextValue, prevValue, name) => {
  //   setRating(nextValue);
  // };

  async function saveReview() {
    if (rating && comment) {
      const response = await axios.post('/api/writecomment', {
        ...productInfo,
        rating,
        comment,
      });

      if (response.data.status) {
        setReviewedInfo({
          productId: productInfo.id,
          isReviewed: true,
        });
        setShowWriteReview(false);
      }
    }
  }
  return (
    <>
      {showWirteReview ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{productInfo.name}</h3>

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowWriteReview(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="w-[500px]">
                    <div className="flex gap-2 items-center">
                      <p>Select Star Rating:</p>

                      <Rating rating={rating} setRating={setRating} />
                      {/* <Rating
                        className="text-[30px]"
                        value={rating}
                        onStarClick={(nextValue, prevValue, name) =>
                          handleStarClick(nextValue, prevValue, name)
                        }
                        starCount={5}
                        starColor={'#ffb400'}
                        emptyStarColor={'#ccc'}
                      /> */}
                    </div>

                    <p>Write Review</p>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-5 mt-2 border-2"
                      type="text"
                      placeholder="Type here...."
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowWriteReview(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-green-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      saveReview();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
