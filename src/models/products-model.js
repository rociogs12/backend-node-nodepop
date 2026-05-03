import fs from 'fs/promises';
import { join } from 'path';
import { ObjectId } from 'mongodb';

import { DATA_PATH } from '../utils/paths.js';
import { dbClient } from '../lib/database.js';
import { Product } from '../models/product-model.js';


const COLLECTION = 'products';




// OBTENER PRODUCTOS (con filtros opcionales)
// Recibe o no los filtros y opciones de páginado
// Devolverña los productos resultantes del filtrado
export async function getProducts(filters = {}, options = {}) {
    const { skip = 0, limit = 8 } = options;

    // Guarda el resultado de buscar en la base de datos según los filtros aplicados
    const result = await Product.find(filters)
        .skip(skip)
        .limit(limit)
        .lean();

    //console.log("PRODUCTS DEBUG:", result);
    // Devuelve los productos resultantes del filtrado con mongoose
    return result;
}

// OBTENER PRODUCTO POR ID
// Recibe el id de un producto
// Devolverá un documento de mongoose
export async function getProduct(id) {
    // Guarda el resultado de buscar en la base de datos según el id 
    const product = await Product.findById(id);
    return product;
}

// AÑADIR PRODUCTO 
// Recibe un objeto {key:value} nuevo
// Lo añade a la base de datos 
// Devolverá un documento de mongoose nuevo
export async function addNewProduct(newProductData) {
    // Crea un nuevo producto
    const newProduct = new Product(newProductData);
    // Lo guarda en la base de datos 
    const savedProduct = await newProduct.save();
    // Devuelve el producto guardado para que el controlador lo pinte en la página
    return savedProduct;
}

// EDITAR PRODUCTO: 
// Recibe un id de producto (existente) y un objeto {key:value} nuevo
// Busca en la base de datos el producto por ese id
// Sobreescribe sus datos con los del objeto nuevo
// Devolverá su documento de mongoose actualizado
export async function updateProduct(productId, updatedProductData) {
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            name: updatedProductData.name,
            price: updatedProductData.price,
            tags: updatedProductData.tags ? (Array.isArray(updatedProductData.tags) ? updatedProductData.tags : [updatedProductData.tags]) : []
        },
        {
            new: true
        })

    return updatedProduct;
}

// BORRAR PRODUCTO
// Recibe un id de producto (existente) 
// Busca en la base de datos el producto por ese id y lo borra
// Devolverá la resolución del borrado
export async function deleteProduct(productId) {
    const deleteResult = await Product.findByIdAndDelete(productId);
    return deleteResult;
}


