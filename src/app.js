// APP

import express from 'express'; 
import session from 'express-session';
import ejs from 'ejs';


import { nodepopRouter } from './routes/routes.js';
import { PUBLIC_PATH, VIEWS_PATH } from './utils/paths.js';

// Servidor 
const app = express(); 

// Global Middlewares 
app.use(express.urlencoded({ extended : true })); // Para que la App pueda leer productos añadidos por Cliente 
app.use(express.static(PUBLIC_PATH)); // Para que la App pueda leer los archivos estáticos

// Middleware para usar session 
app.use(session({
    secret: 'nodepop-secret',
    resave: false, 
    saveUninitialized: false
}));

// Motor de plantillas
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views',VIEWS_PATH);

// Middleware de comprobación de usuario  
app.use((req, res, next) => {
    req.user = req.session.user || null; 
    next();
});

// Hacer accesible user en todas las rutas
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Ruta principal
app.use('/', nodepopRouter);


// Catch error si no entra en ninguna de las demás rutas.
app.use((req,res)=>{
    res.status(404).send('Resource not found.');
});

export default app; 
console.log('APP START');