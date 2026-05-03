// LOGIN CONTROLLER
import { title } from "../utils/variables.js";

export function loginPageController(req, res, next) {
    // 1. Pintar la página de Login inicial
    res.render('login', {
        title: title,
        error: null
    });
}

export function loginController(req, res, next) {
    // 1. Recoge datos
    const { username } = req.body;

    // 2. Valida datos
    // Si no hay o está vacío mensaje de usuario obligatorio
    if (!username || username.trim() === '') {
        return res.render('login', {
            title: title,
            error: 'El usuario es obligatorio'
        });
    }
    // Asignar username a user
    req.session.user = { username };

    // Redirección a la página principal
    res.redirect('/');
}

export function logoutController(req, res, next) {
    // Cerrar sesión y redirigirte a la página principal
    req.session.destroy(() => {
        res.redirect('/');
    });
}