import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { Transaction } from '@/models/Transaction';
import client from '@/utils/paypal';
import paypal from '@paypal/checkout-server-sdk';

export default async function Handler(req, res) {
  if (req.method != 'POST')
    return res.status(404).json({ success: false, message: 'Not Found' });

  if (!req.body.order_price || !req.body.user_id)
    return res.status(400).json({
      success: false,
      message: 'Please Provide order_price And User ID',
    });

  try {
    const PaypalClient = client();
    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['prefer'] = 'return=representation';
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: req.body.order_price + '',
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.log('RES: ', response);
      return res
        .status(500)
        .json({ success: false, message: 'Some Error Occured at backend' });
    }

    // console.log(JSON.stringify(response.result, null, 4));
    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB

    await mongooseConnect();

    const savedOrderInfo = await Order.create({
      id: response.result.id,
      userId: req.body.user_id,
      products: req.body.products,
      subtotal: req.body.subtotal,
      gst: req.body.gst,
      netamount: req.body.netamount,
      paymentType: req.body.paymentType,
      status: 'Pending',
      paid: false,
    });

    const savedTransactionInfo = await Transaction.create({
      txn_id: response.result.id,
      email: response.result.purchase_units[0].payee.email_address,
      merchant_id: response.result.purchase_units[0].payee.merchant_id,
      order_id: savedOrderInfo.id,
      status: response.result.status === 'CREATED' && 'Pending',
      amount: response.result.purchase_units[0].amount.value,
      currency_code: response.result.purchase_units[0].amount.currency_code,
      time: response.result.create_time,
    });

    if (savedOrderInfo && savedTransactionInfo) {
      res.status(200).json({
        success: true,
        data: {
          order: {
            order_id: response.result.id,
          },
        },
      });
    }
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return res
      .status(500)
      .json({ success: false, message: 'Could Not Found the user' });
  }
}
