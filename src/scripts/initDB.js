
import connectMongoose from '../lib/connectMongoose.js';
import { Product } from '../models/product-model.js';

async function initDB() {
    try {
        // 1. Conexión a la base de datos 
        console.log("Conectándose a MongoDB desde initDB...");
        await connectMongoose();

        // 2. Borrado de datos
        console.log("Borrando datos antiguos desde initDB...");
        await Product.deleteMany({});

        // 3. Creando datos iniciales de nuevo:
        console.log("Creando datos nuevos desde initDB");
        const products = [
            {
                name: 'iPhone 14',
                price: 900,
                owner: 'pedro',
                tags: ['mobile']
            },
            {
                name: 'MacBook Pro',
                price: 2000,
                owner: 'carlos',
                tags: ['work', 'lifestyle']
            },
            {
                name: 'Yamaha MT-07',
                price: 6500,
                owner: 'laura',
                tags: ['motor']
            },
            {
                name: 'Logitech Z207',
                price: 58,
                owner: 'david',
                tags: ['work']
            },
            {
                name: 'Samsung Galaxy S23',
                price: 850,
                owner: 'rocio',
                tags: ['mobile']
            },
            {
                name: 'Dell XPS 13',
                price: 1400,
                owner: 'miguel',
                tags: ['work']
            },
            {
                name: 'Nintendo Switch',
                price: 300,
                owner: 'sofia',
                tags: ['lifestyle']
            },
            {
                name: 'PlayStation 5',
                price: 500,
                owner: 'juan',
                tags: ['lifestyle']
            },
            {
                name: 'Tesla Model 3',
                price: 39000,
                owner: 'alberto',
                tags: ['motor', 'lifestyle']
            },
            {
                name: 'Bicicleta Trek FX 3',
                price: 800,
                owner: 'lucia',
                tags: ['lifestyle', 'motor']
            },
            {
                name: 'iPad Air',
                price: 700,
                owner: 'carlos',
                tags: ['mobile', 'lifestyle']
            },
            {
                name: 'Apple Watch Series 9',
                price: 450,
                owner: 'ana',
                tags: ['lifestyle']
            },
            {
                name: 'HP Envy 6020',
                price: 120,
                owner: 'david',
                tags: ['work']
            },
            {
                name: 'Canon EOS 250D',
                price: 650,
                owner: 'laura',
                tags: ['lifestyle']
            },
            {
                name: 'GoPro Hero 12',
                price: 400,
                owner: 'sofia',
                tags: ['lifestyle']
            },
            {
                name: 'Xiaomi Redmi Note 12',
                price: 250,
                owner: 'miguel',
                tags: ['mobile']
            },
            {
                name: 'Seat Ibiza',
                price: 15000,
                owner: 'juan',
                tags: ['motor']
            },
            {
                name: 'Patinete Xiaomi Pro 2',
                price: 500,
                owner: 'lucia',
                tags: ['motor', 'lifestyle']
            },
            {
                name: 'Monitor LG UltraWide',
                price: 350,
                owner: 'alberto',
                tags: ['work']
            },
            {
                name: 'Teclado Mecánico Keychron K6',
                price: 120,
                owner: 'david',
                tags: ['work', 'lifestyle']
            }
        ];
        // 4. Añadiendo datos nuevos a la base de datos
        await Product.insertMany(products);
        console.log("Datos añadidos correctamente!");
        process.exit(0);

    } catch (error) {
        console.error("Error inicializando la base de datos:", error);
        process.exit(1);
    }
}


initDB(); 