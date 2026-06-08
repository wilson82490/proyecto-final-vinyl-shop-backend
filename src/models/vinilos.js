import mongoose from 'mongoose';

const vinylSchema = new mongoose.Schema({
  name:        { type: String, required: true, minlength: 3 },
  artist:      { type: String, required: true },
  description: { type: String, default: '' },
  price:       { type: Number, required: true, min: 0 },
  category:    { type: String, required: true },
  image:       { type: String, default: '' },
  label:       { type: String, default: '' },
  year:        { type: Number, required: true },
  format:      { type: String, default: '' },
  stock:       { type: Number, default: 0 },
  featured:    { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Vinilos', vinylSchema);
