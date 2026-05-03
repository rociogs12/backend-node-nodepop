import mongoose from 'mongoose';
mongoose.connection.on('error', err => {
  console.error('Error de conexión:', err);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB con Mongoose');
});

export default async function connectMongoose() {
  // Ruta a la base de datos
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nodepop';
  await mongoose.connect(uri);
}
