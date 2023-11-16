/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Context } from './Context/ContextProvider';
import axios from 'axios';
import { useRouter } from 'next/router';
import WriteReviewModal from './modal/WriteReview';

export default function MyOrdersPage() {
  const { userInfo } = useContext(Context);
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetchUserOrders();
  }, [reload]);

  async function fetchUserOrders() {
    try {
      const response = await axios.get('/api/orders/' + userInfo._id);
      if (response.data) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section>
      <div>
        <h1 className="title">My Orders</h1>

        <div className="mt-5 hidden md:flex">
          <table className=" bg-white rounded-md shadow-md">
            <thead>
              <tr>
                <th className="table-head">Date</th>
                <th className="table-head">Order_id</th>
                <th className="table-head">Products</th>
                <th className="table-head">Payment_Type</th>
                <th className="table-head">Amount</th>
                <th className="table-head">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => {
                  if (order.paid || order.paymentType == 'COD') {
                    return (
                      <tr key={order.id} className="border border-t-gray-300">
                        <td
                          className="px-2 py-4"
                          onClick={() =>
                            router.push('/order/summary?id=' + order.id)
                          }
                        >
                          {new Date(order.createdAt).toLocaleString('en-IN')}
                        </td>
                        <td
                          onClick={() =>
                            router.push('/order/summary?id=' + order.id)
                          }
                          className="px-2 py-4"
                        >
                          {order.id}
                        </td>
                        <td
                          className="px-2 py-4"
                          onClick={() =>
                            router.push('/order/summary?id=' + order.id)
                          }
                        >
                          {order.products.map((product) => {
                            return (
                              <div
                                key={product._id}
                                className="flex justify-between items-center gap-5"
                              >
                                <p>{product.title}</p>
                                <p>
                                  <span className="text-gray-400">Qty: </span>
                                  {product.quantity}
                                </p>
                              </div>
                            );
                          })}
                        </td>
                        <td
                          className="px-2 py-4"
                          onClick={() =>
                            router.push('/order/summary?id=' + order.id)
                          }
                        >
                          {order.paymentType}
                        </td>
                        <td
                          className="px-2 py-4"
                          onClick={() =>
                            router.push('/order/summary?id=' + order.id)
                          }
                        >
                          $ {order.netamount}
                        </td>
                        <td
                          className="px-2 py-4"
                          onClick={() =>
                            router.push('/order/summary?id=' + order.id)
                          }
                        >
                          {order.status}
                        </td>
                        <td className="px-2 py-4">
                          {order.status === 'Delivered' && (
                            <button
                              className="text-sm bg-gray-400 px-2 py-1 rounded-md text-gray-100"
                              onClick={() => {
                                setOrder(order);
                                setShowWriteReviewModal(true);
                              }}
                            >
                              Write Review
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex-col md:hidden w-full">
          {orders &&
            orders.map((order) => {
              if (order.paid || order.paymentType == 'COD') {
                return (
                  <div
                    className="shadow-md rounded-md p-3 w-full mb-3 text-sm"
                    key={order.id}
                  >
                    <div className="flex justify-between items-center w-full mb-3">
                      <p>
                        <span className="text-sm text-gray-400">OrderId :</span>{' '}
                        {order.id}
                      </p>
                      <p>
                        <span className="text-gray-400">Date: </span>{' '}
                        {new Date(order.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full mb-3">
                      <p>
                        <span className="text-gray-400">Payment Type :</span>{' '}
                        {order.paymentType}
                      </p>
                      <p>
                        <span className="text-gray-400">Status : </span>
                        {order.status}
                      </p>
                    </div>

                    <p className="text-gray-400 mb-3">Products</p>

                    {order.products.map((product) => {
                      return (
                        <div key={product._id}>
                          {product.title} &nbsp;&nbsp; &nbsp;&nbsp;
                          <span className="text-gray-400">Qty :</span>{' '}
                          {product.quantity}
                        </div>
                      );
                    })}

                    <div className="flex gap-2 w-full mt-3">
                      <div className="w-[70%]">
                        <p className="text-xl font-bold ">${order.netamount}</p>
                      </div>
                      <div className="w-[30%]">
                        {order.status === 'Delivered' && (
                          <button
                            className="text-sm bg-gray-400 px-2 py-1 rounded-md text-gray-100"
                            onClick={() => {
                              setOrder(order);
                              setShowWriteReviewModal(true);
                            }}
                          >
                            Write Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        {showWriteReviewModal && (
          <WriteReviewModal
            showWriteReviewModal={showWriteReviewModal}
            order={order}
            setShowWriteReviewModal={setShowWriteReviewModal}
            setReload={setOrder}
          />
        )}
        {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
      </div>
    </section>
  );
}
