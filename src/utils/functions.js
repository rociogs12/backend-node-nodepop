export function buildFilters(query, user, myItems = false) {
    // Acumulador de filtros que se aplicarán: 
    const filters = {};

    // FILTRO POR NOMBRE: 
    // Si se ha escrito algo en el buscador:
    if (query.name) {
        // Expresión regular: ^ = empieza por + contenido escrito en el buscador + 'i' = ignora mayúsculas/minúsculas
        filters.name = new RegExp('^' + query.name, 'i');
    }

    // FILTRO POR PRECIO:
    // Si se ha escrito un precio mínimo o un precio máximo (o los dos):
    if (query.priceMin || query.priceMax) {
        // Inicia objeto precio
        filters.price = {};

        if (query.priceMin) {
            // $gte: más grande o igual 
            // convierte a número porque viene como string
            filters.price.$gte = Number(query.priceMin);
        }

        if (query.priceMax) {
            // $lte: más pequeño o igual 
            // convierte a número porque viene como string
            filters.price.$lte = Number(query.priceMax);
        }
    }

    // Filtro por tags 
    if (query.tags) {
        filters.tags = {
            $in: Array.isArray(query.tags)
                ? query.tags
                : [query.tags]
        };
    }

    // Filtro por usuario
    if (myItems && user?.username) {
        filters.owner = user.username;
    }

    return filters;
}

// Construye las url de paginación
export function buildQueryString(query, page) {
    // Guarda la query actual tipo  de http://127.0.0.1:3000/?name=&tags=work&priceMin=&priceMax=
    // guarda: name=&tags=work&priceMin=&priceMax=
    const params = new URLSearchParams(query);
    // añade page=número
    params.set('page', page); // el set añade el &
    // devuelve ?name=&tags=work&priceMin=&priceMax=&page=número
    return '?' + params.toString();
}

// Función para validación de datos al crear o editar un producto
export function validateData(productData) {
    const errors = {
        name: null,
        price: null,
        general: null
    };

    if (!productData.name || productData.name.trim() === '') {
        errors.name = 'Debes añadir un nombre al producto';
    }

    if (!productData.price || Number(productData.price) <= 0) {
        errors.price = 'El precio debe ser superior a 0€';
    }

    return errors;
}