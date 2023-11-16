const { Schema, models, model, default: mongoose } = require('mongoose');

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    zipcode: { type: String, default: '' },
    country: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model('User', UserSchema);
