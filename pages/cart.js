/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Center from '@/components/Center';
import Header from '@/components/Header';
import Button from '@/components/properties/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Context } from '@/components/Context/ContextProvider';

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    removeProduct,
    clearCart,
    authStatus,
    userInfo,
  } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [paymentType, setPaymentType] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace({
        pathname: '/login',
        query: { from: router.asPath },
      });
    } else {
      if (cartProducts.length > 0) {
        axios.post('/api/cart', { ids: cartProducts }).then((result) => {
          setProducts(result.data);
        });
      }
    }
  }, [cartProducts, authStatus]);

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
    total.toFixed(2);
  }

  if (cartProducts.length === 0) {
    return (
      <section>
        <Header />
        <Center>
          <div className="p-5 md:p-0">
            <h1 className="title mt-[100px]">My Cart</h1>
            <div className="bg-white rounded-md p-5 flex items-center justify-center min-h-[60vh]">
              <div>
                <div className="text-center text-gray-400 mb-5 font-bold text-xl">
                  Your cart is empty!
                </div>
                <div onClick={() => router.push('/products')}>
                  <Button black={true}>Continue to shopping</Button>
                </div>
              </div>
            </div>
          </div>
        </Center>
      </section>
    );
  }

  const paypalCaptureOrder = async (orderID) => {
    try {
      let response = await axios.post('/api/paypal/captureorder', {
        orderID,
      });
      if (response.data.success) {
        clearCart();

        setTimeout(() => {
          router.push('/order/thankyoufororder/' + response.data.order_id);
        }, 1000);

        // setRespond(response);
        // alert('sucess');
        // Order is successful
        // Your custom code
        // Like showing a success toast:
        // toast.success('Amount Added to Wallet')
        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
      }
    } catch (err) {
      // Order is not successful
      // Your custom code
      // Like showing an error toast
      // toast.error('Some Error Occured')
    }
  };

  const paypalCreateOrder = async (amount, total) => {
    let orderedProduct = [];

    products.map((product) => {
      orderedProduct.push({
        ...product,
        quantity: cartProducts.filter((id) => id === product._id).length,
      });
    });

    let stringAmount = amount + '';
    if (authStatus === 'authenticated' && orderedProduct.length > 0) {
      try {
        let response = await axios.post('/api/paypal/createorder', {
          user_id: userInfo._id,
          order_price: stringAmount,
          products: orderedProduct,
          netamount: amount.toFixed(2),
          gst: 8,
          subtotal: total,
          paymentType,
        });
        return response.data.data.order.order_id;
      } catch (err) {
        console.log({ errror: err.response.data });
        // Your custom code to show an error like showing a toast:
        // toast.error('Some Error Occured')
        return null;
      }
    } else {
      return;
    }
  };

  async function createCodOrder({ netamount, subtotal }) {
    let orderedProduct = [];

    products.map((product) => {
      orderedProduct.push({
        ...product,
        quantity: cartProducts.filter((id) => id === product._id).length,
      });
    });
    if (authStatus === 'authenticated' && orderedProduct.length > 0) {
      const response = await axios.post('/api/placeorder', {
        user_id: userInfo._id,
        products: orderedProduct,
        netamount: netamount.toFixed(2),
        gst: 8,
        subtotal,
        paymentType,
      });

      if (response) {
        clearCart();

        setTimeout(() => {
          router.push('/order/thankyoufororder/' + response.data.order_id);
        }, 1000);
      }
    }
  }

  return (
    <section>
      <Header />
      <Center>
        <div className="p-5 md:p-0">
          <h1 className="title mt-[100px]">My Cart</h1>

          {/* <pre>{JSON.stringify(respond, null, 4)}</pre> */}

          {products && total > 0 && (
            <div className="md:flex justify-between gap-3">
              <div className="md:w-[70%]">
                <div className="bg-white rounded-md p-5">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="table-head">Product</th>
                        <th className="table-head">Quantity</th>
                        <th className="table-head">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((product) => {
                          return (
                            <tr
                              key={product._id}
                              className="border-t-2 border-[rgba(0, 0, 0, 0.1)] mb-2"
                            >
                              <td className="py-5 px-0">
                                <div
                                  className="md:w-[100px] w-[70px] h-[70px] md:h-[100px] p-[10px] border-2 border-[rgba(0, 0, 0, 0.1)] flex items-center justify-center rounded-md"
                                  onClick={() =>
                                    router.push('/product/' + product._id)
                                  }
                                >
                                  <img
                                    className="md:max-w-full max-w-[60px] max-h-[60px] md:max-h-[95px]"
                                    src={product.images?.[0]}
                                    alt=""
                                  />
                                </div>
                                {product.title}
                              </td>
                              <td className="py-5 px-0">
                                <button
                                  onClick={() => removeProduct(product._id)}
                                  className="bg-gray-300 px-3 rounded-sm text-sm"
                                >
                                  -
                                </button>{' '}
                                <br />
                                <div className="inline-block py-0 px-3">
                                  {
                                    cartProducts.filter(
                                      (id) => id === product._id
                                    ).length
                                  }
                                </div>
                                <br />
                                <button
                                  onClick={() => addProduct(product._id)}
                                  className="bg-gray-300 px-3 rounded-sm text-sm"
                                >
                                  +
                                </button>
                              </td>
                              <td className="py-5 px-0">
                                ${' '}
                                {cartProducts.filter((id) => id === product._id)
                                  .length * product.price}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-10 md:mt-0 md:w-[30%]">
                <div className=" bg-white rounded-md p-5 md:fixed">
                  <h1 className="text-2xl font-bold mb-5">Order Information</h1>
                  <div className="w-full flex justify-between items-center mb-2">
                    <div className="text-lg font-semibold">SubTotal : </div>
                    <div className="text-right text-lg">$ {total}</div>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="text-lg font-semibold">GST(8%) : </div>
                    <div className="text-right text-lg">
                      $ {(total * 8) / 100}
                    </div>
                  </div>

                  <hr className="my-4" />
                  <div className="w-full flex justify-between items-center">
                    <div className="text-xl font-semibold">Net Amount : </div>
                    <div className="text-right text-xl font-medium">
                      $ {(total + (total * 8) / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-5">
                    <p>Select Payment Method</p>

                    <div className="mt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            onChange={(e) => setPaymentType('COD')}
                            type="radio"
                            name="payment_method"
                            className="w-[10%]"
                          />
                          <label>Cash on delivery</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            onChange={() => setPaymentType('Paypal')}
                            type="radio"
                            name="payment_method"
                            className="w-[10%]"
                          />
                          <label>PayPal</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {paymentType === 'Paypal' && (
                    <div className="mt-5">
                      {/* <Button black={true}>Continue to payment</Button> */}

                      <PayPalScriptProvider
                        options={{
                          'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                          currency: 'USD',
                          intent: 'capture',
                        }}
                      >
                        <PayPalButtons
                          style={{
                            color: 'gold',
                            shape: 'rect',
                            label: 'pay',
                            height: 50,
                          }}
                          createOrder={async (data, actions) => {
                            let netAmountWithGst = total + (total * 8) / 100;
                            let order_id = await paypalCreateOrder(
                              netAmountWithGst,
                              total
                            );

                            console.log(order_id);
                            return order_id;
                          }}
                          onApprove={async (data, actions) => {
                            let response = await paypalCaptureOrder(
                              data.orderID
                            );
                            if (response) return true;
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                  {paymentType === 'COD' && (
                    <div
                      className="mt-5"
                      onClick={() =>
                        createCodOrder({
                          netamount: total + (total * 8) / 100,
                          subtotal: total,
                        })
                      }
                    >
                      <Button black={true}>Buy Now</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Center>
    </section>
  );
}
