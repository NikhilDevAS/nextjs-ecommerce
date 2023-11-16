import Center from '@/components/Center';
import Header from '@/components/Header';
import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { useRouter } from 'next/router';

export default function OrderSummary({ orderdetails }) {
  const router = useRouter();

  return (
    <section>
      <Header />
      <Center>
        <div className="mt-[100px] min-h-[60vh] bg-white rounded-md ">
          <div className="flex items-center justify-center pt-10">
            <h1 className="title">Order Summary</h1>
          </div>

          <div className="m-10 flex gap-3">
            <div className="w-[70%]">
              <h2 className="text-xl font-semibold mb-5">Ordered Products</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-head">Product</th>
                    <th className="table-head">Quantity</th>
                    <th className="table-head">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderdetails.products &&
                    orderdetails.products.map((product) => {
                      return (
                        <tr
                          key={product._id}
                          className="border-t-2 border-[rgba(0, 0, 0, 0.1)] mb-2"
                        >
                          <td className="py-5 px-0">{product.title}</td>
                          <td className="py-5 px-0">
                            <div className="inline-block py-0 px-3">
                              {product.quantity}
                            </div>
                          </td>
                          <td className="py-5 px-0">
                            $ {product.quantity * product.price}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="w-[30%]  shadow-md p-5">
              <div className="w-full p-5 bg-green-600 rounded-md mb-3 text-center text-white text-md font-bold">
                {orderdetails.paid && 'Payment Successfully!'}
                {orderdetails.paymentType == 'COD' && 'Order Placed!'}
              </div>
              <h1 className="text-2xl font-bold mb-5">Order Information</h1>
              <div className="w-full flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">SubTotal : </div>
                <div className="text-right text-lg">
                  $ {orderdetails.subtotal}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-lg font-semibold">GST(8%) : </div>
                <div className="text-right text-lg">
                  $ {(orderdetails.subtotal * orderdetails.gst) / 100}
                </div>
              </div>

              <hr className="my-4" />
              <div className="w-full flex justify-between items-center">
                <div className="text-xl font-semibold">Net Amount : </div>
                <div className="text-right text-xl font-medium">
                  $ {orderdetails.netamount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Center>
    </section>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const orderdetails = await Order.findOne({ id: id });

  return {
    props: {
      orderdetails: JSON.parse(JSON.stringify(orderdetails)),
    },
  };
}
