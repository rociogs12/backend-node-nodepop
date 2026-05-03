import { title } from '../utils/variables.js';
import { getProducts, getProduct, addNewProduct, updateProduct, deleteProduct } from '../models/products-model.js';
import {  buildFilters, buildQueryString, validateData } from '../utils/functions.js';
import { Product } from '../models/product-model.js';

// (GET) -> PINTA LA PÁGINA DE PRODUCTOS
export async function productsPageController(req, res, next) {
    console.log("HE ENTRADO EN LA PAGINA DE PRODUCTOS!");
    console.log("USER:", req.user);
    try {
        // 1. METER DATOS
        const title = 'Nodepop';
        const subtitle = 'Productos';

        // 2. PAGINACIÓN 
        const limit = Number(req.query.limit) || 8;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;


        // 3. CONSULTA DE DATOS Y FILTRADO 
        const { name, tags, priceMin, priceMax } = req.query;
        

        // 4. FILTROS
        const myItems = req.query.myItems === 'true'; // req.query devuelve un string, así que hay que pasar el booleano a string para evaluarlo
        // consultar que filtros se han seleccionado
        const filters = buildFilters(req.query, req.user, myItems);

        console.log('FILTROS:', filters);

        // 5. GUARDAR PRODUCTOS RESULTADO DEL FILTRADO, si no hay, todos.
        const products = await getProducts(filters, { skip, limit });
       
        // total de productos (para páginas)
        const totalProducts = await Product.countDocuments(filters);
        const totalPages = Math.ceil(totalProducts / limit); 


        // 6. RESPONSE: listado.
        res.render('index', {
            title,
            subtitle,
            products,
            query: req.query,
            page,
            totalPages, 
            buildQueryString
        });

    } catch (error) {
        next(error);
    }
}

// (GET) -> PINTA LA PAGINA DE CREACIÓN DE PRODUCTO
export async function createProductPageController(req, res, next) {
    // 1. Preparar datos: 
    const subtitle = 'Añadir producto';

    // 2. Renderizar página de creación de nuevo producto.
    res.render('product.html', {
        title: title,
        subtitle: subtitle,
        values: {},
        errors: {
            name: null,
            price: null
        }
    });
}

//(POST) -> CREA EL PRODUCTO y te devuelve a la página inicial
export async function createProductController(req, res, next) {
    // 1. Datos iniciales
    const subtitle = 'Añadir producto';
    const newProductData = req.body;

    try {
        //2. Validación de datos
        // Añadir automáticamente usuario
        newProductData.owner = req.user.username;

        // Posibles errores:
        const errors = validateData(newProductData);

        // Si hay errores, tras el intento de POST devuelve la página avisando de los errores
        if (errors.name || errors.price) {
            return res.render('product.html', {
                title,
                subtitle,
                values: newProductData,
                errors
            });
        }

        // 3. Si no hay errores -> Guardado 
        await addNewProduct(newProductData);

        // 4. Después de guardar -> Vuelves a página de productos
        res.redirect('/');

    } catch (error) {
        // 5. Si falla algo que no es de validación de datos: 
        console.error("Error al guardar:", error); // (por si acaso)

        // Enviamos al usuario de vuelta con un mensaje de error del servidor
        res.render('product.html', {
            title,
            subtitle,
            values: {},
            errors: {
                name: null,
                price: null,
                general: 'Error interno al guardar el producto'
            }
        });
    }
}

// (GET) -> PINTA LA PÁGINA DE EDICIÓN DE PRODUCTOS
export async function editProductPageController(req, res, next) {

    const subtitle = 'Editar producto';

    try {
        // 1. Guardamos el id
        const { id } = req.params;

        // 2. Buscamos el producto por su id
        const productData = await getProduct(id);

        // 3. Si no existe, mandamos al error 404 (next)
        if (!productData) {
            console.log("No he encontrado el producto con ID");
            return next();
        }
        console.log("Producto encontrado, enviando a la vista:", productData);

        // 4. Renderizamos resultado
        res.render('product.html', {
            title: title,
            subtitle,
            values: productData,
            errors: {
                name: null,
                price: null
            }
        });

    } catch (error) {
        next(error);
    }
}

// (POST) -> EDITA EL PRODUCTO y te devuelve a la página principal
export async function updateProductController(req, res, next) {
    try {
        const { id } = req.params;

        const product = await getProduct(id);

        if (product.owner !== req.user.username) {
            return res.status(403).send('Sólo puedes editar tus productos.');
            res.redirect('/');
        }

        await updateProduct(id, req.body);

        res.redirect('/');

    } catch (error) {
        next(error);
    }
}
// (POST) -> ELIMINA EL PRODUCTO y te devuelve a la página principal
export async function deleteProductController(req, res, next) {
    try {
        const { id } = req.params;

        await deleteProduct(id);

        res.redirect('/');

    } catch (error) {
        next(error);
    }
}