const { models, model } = require('mongoose');
const { Schema, default: mongoose } = require('mongoose');

const OrderSchema = new Schema(
  {
    id: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    products: { type: Object, required: true },
    paid: { type: Boolean, default: false },
    subtotal: { type: Number, required: true },
    gst: { type: Number, required: true },
    netamount: { type: Number, required: true },
    paymentType: { type: String, required: true },
    status: { type: String, default: 'Placed' },
  },

  {
    timestamps: true,
  }
);

export const Order = models.Order || model('Order', OrderSchema);
