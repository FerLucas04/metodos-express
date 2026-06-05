const express = require('express');
const app = express(); 
app.use(express.json());

const libros = [
    { "id": 1, "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "anio": 1967, "genero": "Realismo Mágico" },
    { "id": 2, "titulo": "Don Quijote de la Mancha", "autor": "Miguel de Cervantes", "anio": 1605, "genero": "Novela"},
    { "id": 3, "titulo": "El amor en los tiempos del cólera", "autor": "Gabriel García Márquez", "anio": 1985, "genero": "Realismo Mágico" },
    { "id": 4, "titulo": "La sombra del viento", "autor": "Carlos Ruiz Zafón", "anio": 2001, "genero": "Misterio" },
    { "id": 5, "titulo": "El código Da Vinci", "autor": "Dan Brown", "anio": 2003, "genero": "Thriller" },
    { "id": 6, "titulo": "1984", "autor": "George Orwell", "anio": 1949, "genero": "Distopía" },
    { "id": 7, "titulo": "El gran Gatsby", "autor": "F. Scott Fitzgerald", "anio": 1925, "genero": "Novela" },
    { "id": 8, "titulo": "Matar a un ruiseñor", "autor": "Harper Lee", "anio": 1960, "genero": "Fiction" }
];

//---------------- GETS ----------------

//1) Get de listar todos los elementos
app.get('/listar-libros', (req, res) => {
    res.json(libros);
});

//2) Get que devuelva 1 elemento por id.
app.get('/libros/:id', (req, res) => {
    const id = req.params.id; //variable que recibe el id

    //se busca el libro que coincida con el id recibido
    const libro = libros.find(libro => libro.id === parseInt(id));

    if (!libro) {
        return res.status(404).json("El id ingresado no concide con ningún libro");
    }

    res.json(libro);
});

//3) Get que deuelva 1 elemento por atributo obligatorio, como el nombre.
app.get('/libros/titulo/:titulo', (req, res) => {
    const titulo = req.params.titulo; //variable que recibe el titulo
    
    //se busca el libro que conincida que el título recibido por parametros
    const libro = libros.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());

    if (!libro) {
        return res.status(404).json("El título ingresado no coincide con ningún libro");
    }

    res.json(libro);
});

//-------------- POSTS --------------


//POST va a recibir datos nuevos y los va a agregar dentro del sistema
app.post('/registrar-usuario', (req, res) => {

    const nombre = req.body.nombre; //guardo lo que el usuario envió para hacer verificaciones

    //Verificar si se envió algo
    if (!nombre) {
        return res.status(400).json({ //400 indica un error de que no senvió el dato que se esperaba.
            error: 'Debe ingresar un nombre'
        });
    }

    //Verificar que el nombre no exista
    const usuarioExistente = usuarios.find(
        usuario => usuario.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (usuarioExistente) {
        return res.status(409).json({ //409 indica conflictos, en este caso el conflicto es el usuario duplicado.
            error: 'El usuario ya existe'
        });
    }


    const nuevoUsuario = {
        id: usuarios.length + 1, //id autoincremental
        nombre: req.body.nombre //nombre que el cliente o nosotros debemos escribir en la petición
    };

    usuarios.push(nuevoUsuario); 
    res.status(201).json(nuevoUsuario); //201 indica que se creó un nuevo recurso
});

//----
//DELETE elimina algo del servidor
app.delete('/borrar-usuario', (req, res) => {

    const id = req.body.id; //obtengo el id que el cliente tuvo que haber enviado
    const iD = parseInt(id);

    const usuario = usuarios.find(usuario => usuario.id === iD); //busco el usuario en mi lista

    //Verificar si existe el usuario
    if (!usuario) {
        return res.status(404).json({ //404 indica que no se encontró el recurso que se solicitó
            error: 'Usuario no encontrado'
        });
    }

    // Obtener posición del usuario
    const indice = usuarios.findIndex(usuario => usuario.id === iD);

    // Eliminar usuario
    usuarios.splice(indice, 1); //'indice' inicio del borrado y '1' la cantidad que cosas que voy a borrar
    res.json({mensaje: 'Usuario eliminado correctamente'});

});

app.patch('/editar-usuario', (req, res) => {

    //Verificar si existe un usuario con el id recibido
    const id = req.body.id;
    const iD = parseInt(id);

    const usuario = usuarios.find(usuario => usuario.id === iD);

    if (!usuario) {
        return res.status(404).json({ //404 indica que no se encontró el recurso que se solicitó
            error: 'Usuario no encontrado'
        });
    }

    const nuevoNombre = req.body.nombre;
    const existeUsuario = usuarios.find(usuario => usuario.nombre.toLowerCase() === nuevoNombre.toLowerCase());

    if (!nuevoNombre) { //Verifiicar que haya enviado un nombre nuevo
        return res.status(400).json({ //400 indica que el cliente no envió el dato que se esperaba
            error: 'Debe ingresar algún nombre'
        })
    } else if (nuevoNombre.toLowerCase() === usuario.nombre.toLowerCase()) { //Verificar si el nombre nuevo es el mismo que el actual
        return res.status(400).json({ //400 indica que el cliente no envió el dato que se esperaba, en este caso el dato es un nombre diferente al actual
            error: 'El nombre ingresa es el mismo'
        });
    }else if (existeUsuario) { //Verificar si existe otro usuario con el mismo nombre
        return res.status(409).json({ //409 indica que hay un conflicto
            error: 'El nombre ingresado ya existe'
        });
    }

    //Actualizar el nombre del usuario
    usuario.nombre = nuevoNombre;
    res.json({mensaje: 'Usuario actualizado correctamente'});
});

// Configuración del servidor 
app.listen(3000, () => { 
    console.log('Servidor escuchando en el puerto 3000'); 
});