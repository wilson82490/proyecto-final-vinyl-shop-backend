import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  vinylId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vinilos',
    required: true,
  },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  name: { type: String, required: true },
  artist: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' },
  stock: { type: Number, default: 0 },
});

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
