// SERVIDOR 
import app from '../app.js';
import connectMongoose from '../lib/connectMongoose.js';

console.log("PORT:", process.env.PORT);
console.log("PORT:", process.env.HOST);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Conectar el servidor a la base de datos antes de que arranque 
console.log("Intentando conectar a la base de datos...");

try {
    // 1. Conectar base de datos
    await connectMongoose();
    
    // 2. Si conexión funciona -> Arrancamos servidor
    app.listen(PORT, HOST, () => {
        console.log(`Express.js app listening on http://${HOST}:${PORT}`);
    });
} catch (error) {
    // Si llega aquí, error real en la consola por si acaso
    console.error("ERROR CRÍTICO: No se pudo conectar a Mongoose antes de arrancar el servidor.");
    console.error(error);
    process.exit(1); // Como fue mal, cierro applicación
}

