import express from 'express';

import {
    productsPageController,
    createProductPageController,
    createProductController,
    editProductPageController,
    updateProductController,
    deleteProductController
} from '../controllers/products-controller.js';

import { loginPageController, loginController, logoutController } from '../controllers/login-controller.js';
import { requireAuth } from '../middlewares/auth.js';

import { aboutPageController } from '../controllers/about-controller.js';

export const nodepopRouter = express.Router(); // Enrutador

console.log('🔧 ROUTER CARGADO');

// HOME (productos)
nodepopRouter.get('/', productsPageController); // (GET) -> Listado principal

// CREATE
nodepopRouter.get('/new', requireAuth, createProductPageController); // (GET) -> formulario vacío 
nodepopRouter.post('/new', requireAuth, createProductController); // (POST) -> crea producto
// EDIT PAGE
nodepopRouter.get('/edit/:id', requireAuth, editProductPageController); // (GET) -> formulario con datos de producto
// UPDATE
nodepopRouter.post('/edit/:id', requireAuth, updateProductController); // (POST) -> actualiza producto
// DELETE
nodepopRouter.post('/delete/:id', requireAuth, deleteProductController); // (POST) -> borra datos


// LOGIN
nodepopRouter.get('/login', loginPageController); // (GET) -> formulario usuario vacío
nodepopRouter.post('/login', loginController); // (POST) -> inicia sesión 
nodepopRouter.get('/logout', logoutController); // (GET) -> cierra sesión


// ABOUT
nodepopRouter.get('/about', aboutPageController);
console.log('ROUTES FILE LOADED');

