import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
  documents: [{
    name: { type: String, required: true },
    reference: { type: String, required: true }
  }],
  last_connection: { type: Date, default: null }
});

export default mongoose.model('User', userSchema);
