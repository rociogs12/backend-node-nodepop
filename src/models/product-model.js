import mongoose, { Schema } from 'mongoose';

// Schema (molde o plantilla)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  owner: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true,
    min: [0, 'El precio debe ser mayor que 0€']
  },
  tags: {
    type: [String],
    enum: ['work', 'lifestyle', 'motor', 'mobile'],
    index: true
  }
});


// Model (contenedor para ser usado o generador para hacer nuevos productos)
export const Product = mongoose.model('Product', productSchema);