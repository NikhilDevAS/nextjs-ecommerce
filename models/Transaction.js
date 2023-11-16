const { Schema, models, model, default: mongoose } = require('mongoose');

const TransactionSchema = new Schema(
  {
    name: { type: String, default: '' },
    txn_id: { type: String, required: true },
    order_id: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    time: { type: String, required: true },
    merchant_id: { type: String, required: true },
    currency_code: { type: String, required: true },
    email: { type: String, required: true },
    updatedTime: { type: String, default: new Date() },
  },
  {
    timestamps: true,
  }
);

export const Transaction =
  models.Transaction || model('Transaction', TransactionSchema);
