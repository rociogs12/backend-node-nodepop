import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// RAÍZ
const appDir = dirname(dirname(fileURLToPath(import.meta.url))); 

// con import.meta.url consulta la url
// fileURLToPath() convierte la url en un path legible en cualquier sistema operativo  
// con dirname() extrae el nombre del directorio de una ruta de archivo 
// (elimina el nombre del archivo y se queda solo con la carpeta)

export const ROOT_PATH = join(appDir, '..');
export const PUBLIC_PATH = join(appDir, '../public');
export const VIEWS_PATH = join(appDir, 'views');
export const DATA_PATH = join(appDir, 'data');