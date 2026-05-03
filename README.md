Nodepop 

1.	Clonar el repositorio:
    git clone <url-del-repo>
    cd nodepop
2.	Instalar dependencias:
    npm install 
	npm install express
	npm install mongodb
	npm install mongoose
	npm install ejs
3. Debes tener un archivo .env en la raíz con el siguiente contenido:
    MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/<database>
    PORT=3000
    HOST=127.0.0.1
4. Este comando borra los datos existentes y crea productos de ejemplo:
    npm run initDB
5. Ejecutar la aplicación
    npm run dev
6. La aplicación estará disponible en:
    http://127.0.0.1:3000/




NOTA DEL AUTOR: 
El css se ha hecho rápido y sin revisión por falta de tiempo para que se viera un poco mejor, lo mismo con la gestión de errores.
He dejado console.log que he ido necesitando para hacer comprobaciones en el proceso. 
Y anotaciones de algunas cosas que no me ha dado tiempo a mejorar.