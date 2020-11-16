/*Inicio declaración del Objeto Compra*/
class Compra {
    constructor (tipoProducto, cantidad, precio) {
        this.tipoProducto = tipoProducto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
/*Fin declaración del Objeto Compra*/

/* Inicio Carga de Productos a vender*/
var alfajorDulceDeLeche = new Producto("D", 50, 100);
var alfajorNuez = new Producto("Z", 60, 100);
var bombonMarroc = new Producto("M", 30, 100);
var bombonNutella = new Producto ("N", 35, 100);
/* Fin Carga de Productos a vender*/

/* Creacion de carrito*/
var prueba = new CarritoDeCompras();

/*Boton para sumar o restar cantidad de producto para agregar al carrito*/
$(document).on('click', '.sumar', function () {
    $(this).prev().val(+$(this).prev().val()+6);
});
$(document).on('click', '.restar', function () {
    if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val()-6);
});


/* Inicio Función activada con el onclick para tomar la compra y hacer el push en el carrito*/
function anotarCompra() {    
    /*Inicio Toma de datos del HTML de la cantidad que va a comprar el usuario*/
    
    var marrocCantidad = document.getElementById("MARROC").value;
    var ddlCantidad = document.getElementById("DDL").value;
    var nuezCantidad = document.getElementById("NUEZ").value;
    var nutellaCantidad = document.getElementById("NUTELLA").value;
    /*Fin Toma de datos del HTML de la cantidad que va a comprar el usuario*/

    
    /*Inicio Creación de la compra en una variable del tipo objeto Compra*/
    var pruebaDdl = new Compra (alfajorDulceDeLeche.nombre, ddlCantidad, (ddlCantidad*alfajorDulceDeLeche.precio));
    var pruebaMarroc = new Compra (bombonMarroc.nombre, marrocCantidad, (marrocCantidad*bombonMarroc.precio));
    var pruebaNuez = new Compra (alfajorNuez.nombre, nuezCantidad, (nuezCantidad*alfajorNuez.precio));
    var pruebaNutella = new Compra (bombonNutella.nombre, nutellaCantidad, (nutellaCantidad*bombonNutella.precio));

    
    /*Fin Creación de la compra en una variable del tipo objeto Compra*/

    /*Inicio de la carga de la compra en el carrito de compras a traves de llamar la funcion agregarAlCarrito
    de la variable prueba que es del tipo objeto CarritoDeCompras*/
    for (var i = 0; i < 4; i++) {
        switch (i) {
        case 0:
            if (ddlCantidad != 0) {
            prueba.agregarAlCarrito(pruebaDdl);
            //$("#DDL").val(0);
            }
        break;
        case 1:
            if (nuezCantidad != 0) {
            prueba.agregarAlCarrito(pruebaNuez);
            //$("#NUEZ").val(0);
            }
        break;
        case 2:
            if (marrocCantidad != 0) {
            prueba.agregarAlCarrito(pruebaMarroc);
            //$("#MARROC").val(0);
            }
        break;
        case 3:
            if (nutellaCantidad != 0) {
            prueba.agregarAlCarrito(pruebaNutella);
            //$("#NUTELLA").val(0);
            }
        break;
        }
    }
    /*Fin de la carga de la compra en el carrito de compras a traves de llamar la funcion agregarAlCarrito
    de la variable prueba que es del tipo objeto CarritoDeCompras*/
    
}
/* Fin Función activada con el onclick para tomar la compra y hacer el push en el carrito*/

/*Recuperar del local storage el objeto carrito en la variable carrito2*/
var carrito2= JSON.parse (localStorage.getItem('carrito'));


/*Inicio Carga de datos del carrito en carrito.html*/

/*Inicio carga en carrito.html de la cantidad a comprar elegida por el usuario y el precio correspondiente*/
var precioTotal = 80;
for (var i = 0; i<carrito2.compraEnCarrito.length; i++){
    if (carrito2.compraEnCarrito[i].tipoProducto == "D") {
        $("#cantidadDdl").html(carrito2.compraEnCarrito[i].cantidad);
        $("#precioDdl").html(carrito2.compraEnCarrito[i].precio);
        precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;
        
    } else if (carrito2.compraEnCarrito[i].tipoProducto == "Z"){
        $("#cantidadNuez").html(carrito2.compraEnCarrito[i].cantidad);
        $("#precioNuez").html(carrito2.compraEnCarrito[i].precio);
        precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;

    } else if (carrito2.compraEnCarrito[i].tipoProducto == "M") {
        $("#cantidadMarroc").html(carrito2.compraEnCarrito[i].cantidad);
        $("#precioMarroc").html(carrito2.compraEnCarrito[i].precio);
        precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;
        
    } else if (carrito2.compraEnCarrito[i].tipoProducto == "N"){
        $("#cantidadNutella").html(carrito2.compraEnCarrito[i].cantidad);
        $("#precioNutella").html(carrito2.compraEnCarrito[i].precio);
        precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;
        
    }

    /*Fin carga en carrito.html de la cantidad a comprar elegida por el usuario y el precio correspondiente*/

}
/*Calculo del precio total a pagar, incluyendo el envio*/
//precioTotal = 80 + carrito2.compraEnCarrito[0].precio + carrito2.compraEnCarrito[1].precio + carrito2.compraEnCarrito[2].precio + carrito2.compraEnCarrito[3].precio;

/*Inicio Carga del total en carrito.html*/
var total = document.getElementById("total");
total.innerHTML = precioTotal + " $";
/*Fin Carga del total en carrito.html*/

/*Fin Carga de datos del carrito en carrito.html*/