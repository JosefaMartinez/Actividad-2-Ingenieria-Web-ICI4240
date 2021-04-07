var RUT = document.getElementById("rut");
var Telefono = document.getElementById("telefono");
var Descripcion = document.getElementById("descripcion");
var Nombre = document.getElementById("nombre");
var Apellido = document.getElementById("apellido");
var CorreoElectronico = document.getElementById("correo");
var Rango = document.getElementById("conocimiento");
/*Variables constantes*/
var Formulario = document.getElementById("formulario");
var botonLimpiar = document.getElementById("Limpiar");
var LenguajesProgramacion = ["Python", "Java", "TypeScript", "PHP", "C#", "C++"]; //Valores id de los checkbox
var AñosExperiencia = ["1", "2", "3", "4", "5"];
/*Limpiar formulario*/
botonLimpiar.addEventListener("click", function (evento) {
    /*Limpiando String y Number*/
    if (Descripcion.value != "") {
        Descripcion.value = "";
    }
    if (Telefono.value != "") {
        Telefono.value = "";
    }
    if (Nombre.value != "") {
        Nombre.value = "";
    }
    if (Apellido.value != "") {
        Apellido.value = "";
    }
    ;
    if (CorreoElectronico.value != "") {
        CorreoElectronico.value = "";
    }
    ;
    if (RUT.value != "") {
        RUT.value = "";
    }
    ;
    /*Limpiar checkbox*/
    var i = 0;
    for (i = 0; i < LenguajesProgramacion.length; i++) {
        var elementCheck = document.getElementById(LenguajesProgramacion[i]);
        /*Se busca cual casilla esta seleccionada, en caso de estas seleccionada desmarca*/
        if (elementCheck.checked) {
            elementCheck.checked = false;
        }
    }
    /*Limpiando radio*/
    for (i = 0; i < AñosExperiencia.length; i++) {
        var elementRadio = document.getElementById(AñosExperiencia[i]);
        if (elementRadio.checked) {
            /*Se busca cual casilla esta seleccionada, en caso de estas seleccionada desmarca*/
            elementRadio.checked = false;
        }
    }
    /*Regresar al valir inicial de range*/
    if (Rango.value != 0) {
        /*Pone el valor del range en 0*/
        Rango.value = 0;
        /*modificar el valor que aparece en el costado derecho*/
        var Valor = document.getElementById('outvol');
        Valor.value = (Rango.value);
    }
    ;
});
/*Validación Formulario*/
Formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var Bandera = true; //Se considera como que todos los datos estan correcto
    if (ValidarLenguajes() == false) {
        Bandera = false;
        MensajeIncorrecto("Debe seleccionar al menos una casilla para el lenguaje de se preferencia");
    }
    /*Comprobando que el numero telefonico teng 9 digitos*/
    if (ComprobarTelefono() == false) {
        Bandera = false;
        MensajeIncorrecto("La cantidad de numeros del Teléfono movil debe ser de 9 digitos. Recuerde que el primer digito debe ser 9");
    }
    /*Comprobando que la descripcion tenga menos de 300 caracteres y que tenga como minimo 20, ya se valida en el html*/
    if (ComprobarCaracteres() == false) {
        Bandera = false;
        MensajeIncorrecto("Cantidad de caracteres en la descripcion no es valida");
    }
    if (ComprobarExperiencia() == false) {
        Bandera = false;
        MensajeIncorrecto("Seleccione algun año de experiencia");
    }
    if (ValidarRut() == false) {
        Bandera = false;
        MensajeIncorrecto("RUT incorrecto, no debe tener punto ni guion");
    }
    /*Si no se encuentraron problemas manda un mensaje indicando*/
    if (Bandera == true) {
        MostrarMensajeCorrecto();
    }
});
function ComprobarTelefono() {
    var numeroTelefono = Telefono.value.toString();
    //Se valida que el primero numero ingresado sea un 9
    if (numeroTelefono[0] != "9") {
        return false;
    }
    //Se valida que tenga 9 digitos
    return ((numeroTelefono.length) == 9);
}
function MensajeIncorrecto(Mensaje) {
    alert(Mensaje);
}
function ComprobarCaracteres() {
    /*Validacion que tengo 20 caracteres mínimo para tenga escrito algo con sentido y
    Contenga máximo 300 caracteres*/
    if ((Descripcion.value.length > 300) || (Descripcion.value.length < 20)) {
        return false;
    }
    return true; //Cumple y no esta vacio
}
function ComprobarExperiencia() {
    var i = 0;
    for (i = 0; i < AñosExperiencia.length; i++) {
        var elementRadio = document.getElementById(AñosExperiencia[i]);
        if (elementRadio.checked) {
            return true;
        }
    }
    return false;
}
function MostrarMensajeCorrecto() {
    var Mensaje = document.getElementById("mensaje");
    /*Oculta el formulario y muestra el mensaje*/
    Formulario.style.display = "none";
    Mensaje.innerHTML = "Hemos recibido sus datos, pronto nos estaremos comunicando con usted";
    Mensaje.style.display = "block";
}
function ValidarLenguajes() {
    var i = 0;
    for (i = 0; i < LenguajesProgramacion.length; i++) {
        //Se selecciona cada casilla con su id y toma la propiedad para saber si fue seleccionado
        var elementCheck = document.getElementById(LenguajesProgramacion[i]);
        /*Se busca cual casilla esta seleccionada, en caso de estas seleccionada se guarda y se confirma el obligatorio*/
        if (elementCheck.checked) {
            return true; //tiene casillas marcadas
        }
    }
    return false; //no tiene casillas marcadas
}
function ValidarRut() {
    var i = 0;
    var tamañoRut = RUT.value.length;
    var valoresAceptados = /^([0-9])*$/;
    if ((tamañoRut == 9) || (tamañoRut == 8)) {
        var Verificador = RUT.value[tamañoRut - 1];
        /*Valida que los sean solo numero el valor anterior an digito verificador*/
        for (i = 0; i < tamañoRut; i++) {
            if ((RUT.value.charAt(i)).match(valoresAceptados)) {
                //console.log(`ES NUMERO ${RUT.value.charAt(i)}`)
            }
            else {
                //console.log(`ES LETRA ${RUT.value.charAt(i)}`)
                return false;
            }
        }
        if (Verificador.match(valoresAceptados) || Verificador == "k" || Verificador == "K") {
            //console.log(`es correcto el ultimo valor es numerico"+${Verificador}`);
            return true;
        }
    }
}
