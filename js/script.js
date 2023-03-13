const bPerm = 2000;
const bProm = 4000;

//----------Creacion de clases----------

class Personaje 
{
    constructor(nombre, rareza, tipo, id) 
    {
        this.nombre = nombre;
        this.rareza = rareza;
        this.tipo = tipo;
        this.id = id;
    }


    asignarId(array) {
        this.id = array.length;
    }
}

class Usuario
{
    constructor(nombre, password, gemas, id) 
    {
        this.nombre = nombre;
        this.password = password;
        this.gemas = parseInt(gemas);
        this.id = id;
        this.pjs = [];
    }

    agregarPj(array)
    {
        const nuevoPersonaje = new Personaje(array.nombre, array.rareza, array.tipo, array.id);
        this.pjs.push(nuevoPersonaje);
    }

    asignarId(array) {
        this.id = array.length;
    }

}

//----------Fin de Creacion de clases----------


//----------Relleno de clases-----------------

const personajes = [

    new Personaje('Low Demon', 'C', 'Fuego', 1),
    new Personaje('Wet Demon', 'R', 'Agua', 2),
    new Personaje('Human', 'C', 'Fuego', 3),
    new Personaje('Dark God ', 'UR', 'Oscuridad', 4),
    new Personaje('Void Horn', 'SSR', 'Vacio', 5)

]

const usuarios = [

    new Usuario('coder', '123445', 10000, 1),
    new Usuario('user1', '123', 0, 2),
    new Usuario('user2', '456', 2000, 3),

]

console.log(usuarios)
console.log(personajes)

//----------Fin de Relleno de clases-----------------


//----------Creacion de Funciones-----------------


/*function admin(usuario, contraseña)
{
    if(usuario == 'coder' && contraseña == '123445')
    {
        alert("Bienvenido al Panel de Administrador")
        let sel
    }
}*/ //----PROXIMAMENTE JUNTO MAS FUNCIONES DE PERSONAJE

function loginGame() //Funcion para ingresar al menu de juego
{
    let intentos = 3;
    let user = "";
    let password = "";
    let indice = -1;
    while (intentos > 0 && indice === -1) {
        user = prompt("Ingrese su usuario :D (Te quedan " + intentos + " intentos)");
        password = prompt("Ingrese su contraseña :D (Te quedan " + intentos + " intentos)");
        indice = usuarios.findIndex(u => u.nombre === user && u.password === password);//guarda el indice de donde se encontro el usuario si no existe sigue en -1
        if (indice === -1) {
            alert("Usuario o contraseña incorrectos");
            intentos--;
        }
    }
    if (indice !== -1) {
        alert("Bienvenido/da " + usuarios[indice].nombre);
    }
    return { exito: indice !== -1, indice };
}

const abonar = (id) => { //funcion flecha para abonar gemas
    let abono = parseInt(prompt("Ingresa el monto a abonar:"));
    if (Number.isNaN(abono)) {
        alert("El valor ingresado no es un numero");
    }
    else {
        usuarios[id].gemas += abono;
        alert("gemas actuales: " + usuarios[id].gemas);
    }
};

function gacha() { //devuelve un random del array personajes
    const random = Math.floor(Math.random() * personajes.length);
    return personajes[random];
}

function cGemas(id) //Muestra las gemas que se tienen
{
    alert("Tu gemas actual es de: " + usuarios[id].gemas + " gemas");
}

function mostrarPersonajes(id) //Muestra una lista de los personajes obtenidos
{
    let mPj = ""

    for(let pers of usuarios[id].pjs)
    {
        mPj += "nombre: " + pers.nombre + ", tipo: " + pers.tipo + ", rareza: " + pers.rareza + "\n";
    }
    alert(mPj);
    console.log(mPj);

}

function bPermanente(id) { //Compra el banner permanente y guarda el nuevo personaje
    alert("El valor del banner permanente es de: " + bPerm + " gemas");
    if (usuarios[id].gemas >= bPerm) {
        usuarios[id].gemas -= bPerm;
        let nuevoPersonaje = gacha();
        const pj = new Personaje(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id);
        console.log(pj);
        console.log(usuarios[id].agregarPj(pj));
        
        alert("Has jugado al Banner Permanente. \nObtuviste a: " + nuevoPersonaje.nombre + ", de rareza " + nuevoPersonaje.rareza + ". \nTe quedan: " + usuarios[id].gemas + " gemas");
    }
    else {
        alert("Gemas insuficientes, tienes: " + usuarios[id].gemas + " gemas");
    }
}

function bPromocional(id) { //Compra el banner promocional y guarda el nuevo personaje
    alert("El valor del banner Promocional es de: " + bProm + " gemas");
    if (usuarios[id].gemas >= bProm) {
        usuarios[id].gemas -= bProm;
        let nuevoPersonaje = gacha();
        const pj = new Personaje(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id);
        console.log(pj);
        console.log(usuarios[id].agregarPj(pj));
        alert("Has jugado al Banner Promocional. \nObtuviste a: " + nuevoPersonaje.nombre + ", de rareza " + nuevoPersonaje.rareza + ". \nTe quedan: " + usuarios[id].gemas + " gemas");
    }
    else {
        alert("Gemas insuficientes, tienes: " + usuarios[id].gemas + " gemas");
    }
} //Encontrar una manera de aumentar las probabilidades de los personajes en especifico(mas raros)

function juego(id) { //Ejecuta el menu de juego

    do {
        opc = parseInt(prompt("Ingresa el numero de la opcion: \n1) Revisar gemas. \n2) Abonar. \n3) Jugar Banner Permanente \n4) Jugar Banner Promocional. \n5) Ver Personajes. \n6) Salir"));
        if (Number.isNaN(opc)) {
            alert("El valor ingresado no es un numero");
            opc = 0;
        }
        else {
            if (opc > 6 || opc <= 0) {
                alert("Ingrese una opcion desde el 1 al 5");
                opc = 0;
            }
            else {

                switch (opc) {
                    case 1:
                        cGemas(id);
                        break;

                    case 2:
                        abonar(id)
                        break;

                    case 3:
                        bPermanente(id);
                        break;

                    case 4:
                        bPromocional(id);
                        break;

                    case 5:
                        mostrarPersonajes(id);
                        break;

                    case 6:
                        alert("Vuleve nuevamente, Adios");
                        break;
                    default:
                        alert("La opcion ingresada no es valida, intenta nuevamente");
                        break;

                }

            }

        }

    } while (opc < 6)

}

function nuevoUsuario() { //Crea un nuevo usuario
    let verificacion = false
    let indice = -1;
    do
    {
        alert("Al crear su usuario se le regalaran 6000 gemas!")

        let user = prompt("Ingrese su usuario :D");
        let password = prompt("Ingrese su contraseña :D");
        let gemas = 6000;
        indice = usuarios.findIndex(u => u.nombre === user && u.password === password);
        if (indice === -1) 
        {
            
            const usuario = new Usuario(user, password, gemas);
            usuarios.push(usuario);
            usuario.asignarId(usuarios);
            console.log(usuarios);
            verificacion = true;
            alert("Usuario creado!");
        }
        else
        {
            alert("usuario ya existe, intente nuevamente");
        }
    }while(!verificacion)
    
}


//----------Fin de Creacion de Funciones-----------------




//----------Inicio de interaccion con Usuario-----------------


let interaccion = true;
let op = 0;
do {
    op = parseInt(prompt("1) Ingresar al Juego. \n2) Crear Usuario. \n3) Salir"));
    if (Number.isNaN(op)) {
        alert("El valor ingresado no es un numero");
        op = 0;
    }
    else {
        if (op > 3 || op <= 0) {
            alert("Ingrese una opcion desde el 1 al 3");
            op = 0;
        }
        else {

            switch (op) {
                case 1:

                    const jugando = loginGame();
                    const verificacion = jugando.exito;
                    const identificacion = jugando.indice;

                    if (verificacion == true) {
                        juego(identificacion);
                    }
                    else {
                        alert("Tu cuenta fue bloqueada, favor revisar tu email para mas informacion")
                        interaccion = false;
                    }
                    break;
                case 2:
                    nuevoUsuario();
                    break;

                case 3:
                    interaccion = false;
                    break;
                default:
                    alert("La opcion ingresada no es valida, intenta nuevamente");
                    break;

            }

        }

    }

} while (interaccion)

// Derechos Reservados a Wladimir Ismael Concha Vargas