/* Creacion de carrito*/
var carrito = [];
getProductosDesdeLocalStorage();
/*Comprobar si hay algo en el Local Storage*/

//	Cargamos la informacion de localStorage
function getProductosDesdeLocalStorage() {
	//	string traido de localstorage en formato JSON
	const carritoEnLocalStorage = localStorage.getItem("carrito");
	if (carritoEnLocalStorage) {
		// objetos parseados a partir del string
        const objetosEnLocalStorage = JSON.parse(carritoEnLocalStorage);
        console.log(carrito)
		objetosEnLocalStorage.forEach((object) => {
			// Transformamos nuestros objetos a Productos y los agregamos al carrito
			let producto = new Producto(
				object.id,
				object.nombre,
				object.precio,
                object.imagen,
                object.descripcion,
                object.cantidadUsuario,
				object.stock
			);
			carrito.push(producto);
		});
	}
}
console.log (carrito)

/*Boton para sumar o restar cantidad de producto para agregar al carrito*/
$(document).on('click', '.sumar', function () {
    $(this).prev().val(+$(this).prev().val()+6);
});

$(document).on('click', '.restar', function () {
     if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val()-6);
 });

 /*Función para indicar que se agregó el pedido al carrito*/
 $('.agregar').click(function (){
     var $this = $(this);
     var textoOriginal = $this.text();

     $this.text('Agregado');
     $this.removeClass('btn-dark');

     setTimeout(function () {
         $this.text(textoOriginal);
         $this.addClass('btn-dark');
     }, 1000);
 });

    var precioTotal = 0;
    carrito.forEach((producto) => {
     var lineaCarrito = crearLineaCarrito(producto);
     contenedorTr.appendChild(lineaCarrito);
     precioTotal = precioTotal +(producto.cantidadUsuario * producto.precio)
     console.log (precioTotal);
     var total = document.getElementById("total");
     total.innerHTML = precioTotal + " $";
 })

 
 function crearLineaCarrito (producto) {
     var lineaCarrito = document.createElement ("tr");

     var elementosHTML = `
     <td><img src='${producto.imagen}' width="50px" /> </td>
     <td>${[producto.nombre]}</td>
     <td>En stock</td>
     <td class="text-right">${[producto.cantidadUsuario]}</td>
     <td class="text-right">${[producto.cantidadUsuario] * [producto.precio]}</td>
     `
     lineaCarrito.innerHTML = elementosHTML;

     var tdButton = document.createElement("td");
     tdButton.classList = "text-right";

    var buttonEliminar = document.createElement ("button");
    buttonEliminar.classList = "btn btn-sm btn-danger eliminar"
    buttonEliminar.id = producto.id;
    buttonEliminar.innerHTML = "Eliminar"

    

    lineaCarrito.appendChild(tdButton);
    tdButton.appendChild(buttonEliminar);

    
     buttonEliminar.addEventListener("click", () => {
        carrito = carrito.filter(function (product) { return product.id != $(event.target).attr('id')})
        
        console.log (carrito)
        if (carrito.length) {
            localStorage.setItem('carrito', JSON.stringify(carrito))
            lineaCarrito.remove()
            
            
        } else {
            localStorage.removeItem('carrito')
            lineaCarrito.remove()
        }
        precioTotal = 0;
        carrito.forEach((producto) => {
            if (carrito.length) {
            precioTotal = precioTotal + (producto.cantidadUsuario * producto.precio)
            console.log (precioTotal);
            var total = document.getElementById("total");
            total.innerHTML = precioTotal + " $";
            } else{
                var total = document.getElementById("total");
                total.innerHTML = "";
            }
        })
       
        
   });
//    var precioProducto = producto.cantidadUsuario * producto.precio
//    console.log (precioProducto)
   
  
//    var precioTotal = precioTotal + precioProducto;
//    console.log (precioTotal);

//     var total = document.getElementById("total");
//     total.innerHTML = precioTotal + " $";

     return lineaCarrito;
    
}

function elegirEnvio(){

        $("#precioEnvio").html($("#lugarDeEnvio option:selected" ).val());
         var total = document.getElementById("total");
         total.innerHTML = precioTotal + parseInt($( "#lugarDeEnvio option:selected" ).val()) + " $";
     }

 
// /*Inicio Carga del total en carrito.html*/
// var total = document.getElementById("total");
// total.innerHTML = precioTotal + " $";
// /*Fin Carga del total en carrito.html*/



// /*/*Inicio declaración del Objeto Compra*/
// class Compra {
//     constructor (tipoProducto, cantidad, precio) {
//         this.tipoProducto = tipoProducto;
//         this.cantidad = cantidad;
//         this.precio = precio;
//     }
// }
// /*Fin declaración del Objeto Compra*/

// /* Inicio Carga de Productos a vender*/
// var alfajorDulceDeLeche = new Producto("D", 50, 100);
// var alfajorNuez = new Producto("Z", 60, 100);
// var bombonMarroc = new Producto("M", 30, 100);
// var bombonNutella = new Producto ("N", 35, 100);
// /* Fin Carga de Productos a vender*/

// /* Creacion de carrito*/
// var prueba = new CarritoDeCompras();
// /*Comprobar si hay algo en el Local Storage*/
// prueba.comprobarLocalStorage();


// /*Boton para sumar o restar cantidad de producto para agregar al carrito*/
// $(document).on('click', '.sumar', function () {
//     $(this).prev().val(+$(this).prev().val()+6);
// });
// $(document).on('click', '.restar', function () {
//     if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val()-6);
// });

// /*Función para indicar que se agregó el pedido al carrito*/
// $('.agregar').click(function (){
//     var $this = $(this);
//     var textoOriginal = $this.text();

//     $this.text('Agregado');
//     $this.removeClass('btn-dark');

//     setTimeout(function () {
//         $this.text(textoOriginal);
//         $this.addClass('btn-dark');
//     }, 1000);
// });

// /* Inicio Función activada con el onclick para tomar la compra y hacer el push en el carrito*/
// function anotarCompra() {


//     /*Inicio Toma de datos del HTML de la cantidad que va a comprar el usuario*/

//     var marrocCantidad = document.getElementById("MARROC").value;
//     var ddlCantidad = document.getElementById("DDL").value;
//     var nuezCantidad = document.getElementById("NUEZ").value;
//     var nutellaCantidad = document.getElementById("NUTELLA").value;
//     /*Fin Toma de datos del HTML de la cantidad que va a comprar el usuario*/


//     /*Inicio Creación de la compra en una variable del tipo objeto Compra*/
//     var pruebaDdl = new Compra (alfajorDulceDeLeche.nombre, ddlCantidad, (ddlCantidad*alfajorDulceDeLeche.precio));
//     var pruebaMarroc = new Compra (bombonMarroc.nombre, marrocCantidad, (marrocCantidad*bombonMarroc.precio));
//     var pruebaNuez = new Compra (alfajorNuez.nombre, nuezCantidad, (nuezCantidad*alfajorNuez.precio));
//     var pruebaNutella = new Compra (bombonNutella.nombre, nutellaCantidad, (nutellaCantidad*bombonNutella.precio));


//     /*Fin Creación de la compra en una variable del tipo objeto Compra*/

//     /*Inicio de la carga de la compra en el carrito de compras a traves de llamar la funcion agregarAlCarrito
//     de la variable prueba que es del tipo objeto CarritoDeCompras*/
//     for (var i = 0; i < 4; i++) {
//         switch (i) {
//         case 0:
//             if (ddlCantidad != 0) {
//             prueba.agregarAlCarrito(pruebaDdl);
//             //$("#DDL").val(0);
//             }
//         break;
//         case 1:
//             if (nuezCantidad != 0) {
//             prueba.agregarAlCarrito(pruebaNuez);
//             //$("#NUEZ").val(0);
//             }
//         break;
//         case 2:
//             if (marrocCantidad != 0) {
//             prueba.agregarAlCarrito(pruebaMarroc);
//             //$("#MARROC").val(0);
//             }
//         break;
//         case 3:
//             if (nutellaCantidad != 0) {
//             prueba.agregarAlCarrito(pruebaNutella);
//             //$("#NUTELLA").val(0);
//             }
//         break;
//         }
//     }
//     /*Fin de la carga de la compra en el carrito de compras a traves de llamar la funcion agregarAlCarrito
//     de la variable prueba que es del tipo objeto CarritoDeCompras*/

// }
// /* Fin Función activada con el onclick para tomar la compra y hacer el push en el carrito*/

// /*Recuperar del local storage el objeto carrito en la variable carrito2*/
// var carrito2= JSON.parse (localStorage.getItem('carrito'));


// /*Inicio Carga de datos del carrito en carrito.html*/

// /*Inicio carga en carrito.html de la cantidad a comprar elegida por el usuario y el precio correspondiente*/
// var precioTotal = 0;
// var precioEnvio = 0;
// function elegirEnvio(){

//     $("#precioEnvio").html($("#lugarDeEnvio option:selected" ).val());
//     var total = document.getElementById("total");
//     total.innerHTML = precioTotal + parseInt($( "#lugarDeEnvio option:selected" ).val()) + " $";
//     //sessionStorage.setItem (('envio'), JSON.stringify ($( "#lugarDeEnvio option:selected" ).val()));
// }
// //precioEnvioElegido = JSON.parse(localStorage.getItem('envio'));
// //console.log(precioEnvioElegido)
// var compraDdlCantidad = 0;
// var compraDdlPrecio = 0;
// var compraNuezCantidad = 0;
// var compraNuezPrecio = 0;
// var compraMarrocCantidad = 0;
// var compraMarrocPrecio = 0;
// var compraNutellaCantidad = 0;
// var compraNutellaPrecio = 0;
// for (var i = 0; i<carrito2.compraEnCarrito.length; i++) {
//         if (carrito2.compraEnCarrito[i].tipoProducto == "D"){
//             compraDdlCantidad = compraDdlCantidad + parseInt(carrito2.compraEnCarrito[i].cantidad);
//             compraDdlPrecio = compraDdlPrecio + parseInt(carrito2.compraEnCarrito[i].precio);
//             $("#cantidadDdl").html(compraDdlCantidad);
//             $("#precioDdl").html(compraDdlPrecio);
//             precioTotal = precioTotal + compraDdlPrecio;
//         } else if (carrito2.compraEnCarrito[i].tipoProducto == "Z"){
//             compraNuezCantidad = compraNuezCantidad + parseInt(carrito2.compraEnCarrito[i].cantidad);
//             compraNuezPrecio = compraNuezPrecio + parseInt(carrito2.compraEnCarrito[i].precio);
//             $("#cantidadNuez").html(compraNuezCantidad);
//             $("#precioNuez").html(compraNuezPrecio);
//             precioTotal = precioTotal + compraNuezPrecio;
//         } else if (carrito2.compraEnCarrito[i].tipoProducto == "M"){
//             compraMarrocCantidad = compraMarrocCantidad + parseInt(carrito2.compraEnCarrito[i].cantidad);
//             compraMarrocPrecio = compraMarrocPrecio + parseInt(carrito2.compraEnCarrito[i].precio);
//             $("#cantidadMarroc").html(compraMarrocCantidad);
//             $("#precioMarroc").html(compraMarrocPrecio);
//             precioTotal = precioTotal + compraMarrocPrecio;
//         } else if (carrito2.compraEnCarrito[i].tipoProducto == "N"){
//             compraNutellaCantidad = compraNutellaCantidad + parseInt(carrito2.compraEnCarrito[i].cantidad);
//             compraNutellaPrecio = compraNutellaPrecio + parseInt(carrito2.compraEnCarrito[i].precio);
//             $("#cantidadNutella").html(compraNutellaCantidad);
//             $("#precioNutella").html(compraNutellaPrecio);
//             precioTotal = precioTotal + compraNutellaPrecio;
//         }

// }
// /*$("#cantidadDdl").html(compraDdlCantidad);
// $("#precioDdl").html(compraDdlPrecio);
// precioTotal = precioTotal + compraDdlPrecio;
// /*$("#cantidadNuez").html(compraNuezCantidad);
// $("#precioNuez").html(compraNuezPrecio);
// precioTotal = precioTotal + compraNuezPrecio;

// /*for (var i = 0; i<carrito2.compraEnCarrito.length; i++){
//     if (carrito2.compraEnCarrito[i].tipoProducto == "D") {
//         $("#cantidadDdl").html(carrito2.compraEnCarrito[i].cantidad);
//         $("#precioDdl").html(carrito2.compraEnCarrito[i].precio);
//         precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;

//     } else if (carrito2.compraEnCarrito[i].tipoProducto == "Z"){
//         $("#cantidadNuez").html(carrito2.compraEnCarrito[i].cantidad);
//         $("#precioNuez").html(carrito2.compraEnCarrito[i].precio);
//         precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;

//     } else if (carrito2.compraEnCarrito[i].tipoProducto == "M") {
//         $("#cantidadMarroc").html(carrito2.compraEnCarrito[i].cantidad);
//         $("#precioMarroc").html(carrito2.compraEnCarrito[i].precio);
//         precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;

//     } else if (carrito2.compraEnCarrito[i].tipoProducto == "N"){
//         $("#cantidadNutella").html(carrito2.compraEnCarrito[i].cantidad);
//         $("#precioNutella").html(carrito2.compraEnCarrito[i].precio);
//         precioTotal = precioTotal + carrito2.compraEnCarrito[i].precio;

//     }

//     /*Fin carga en carrito.html de la cantidad a comprar elegida por el usuario y el precio correspondiente*/

// //}
// /*Calculo del precio total a pagar, incluyendo el envio*/
// //precioTotal = 80 + carrito2.compraEnCarrito[0].precio + carrito2.compraEnCarrito[1].precio + carrito2.compraEnCarrito[2].precio + carrito2.compraEnCarrito[3].precio;

// /*Inicio Carga del total en carrito.html*/
// var total = document.getElementById("total");
// total.innerHTML = precioTotal + " $";
// /*Fin Carga del total en carrito.html*/

// /*Fin Carga de datos del carrito en carrito.html*/

// /*Inicio Eliminar del carrito un producto*/
// /*Eliminar Alfajor de Dulce de Leche*/
// $(document).on('click', '#eliminarDdl', function() {
//     $("#cantidadDdl").html("");
//     $("#precioDdl").html("");
//     for (var i = 0; i<carrito2.compraEnCarrito.length; i++){

//         if (carrito2.compraEnCarrito[i].tipoProducto == "D") {

//             $("#total").html(precioTotal - carrito2.compraEnCarrito[i].precio);
//             console.log(carrito2.compraEnCarrito.splice(i,1));
//             localStorage.setItem (('carrito'), JSON.stringify (carrito2));

//         }
//     }
// });
// /*Eliminar Alfajor con Nuez*/
// $(document).on('click', '#eliminarNuez', function() {
//     $("#cantidadNuez").html("");
//     $("#precioNuez").html("");
//     for (var i = 0; i<carrito2.compraEnCarrito.length; i++){
//         if (carrito2.compraEnCarrito[i].tipoProducto == "Z") {
//             console.log(prueba.compraEnCarrito);
//             $("#total").html(precioTotal - carrito2.compraEnCarrito[i].precio);
//             console.log(prueba.compraEnCarrito.splice(i,1));
//             localStorage.setItem (('carrito'), JSON.stringify (prueba));
//         }
//     }
// });
// /*Eliminar Bombón tipo Marroc*/
// $(document).on('click', '#eliminarMarroc', function() {
//     $("#cantidadMarroc").html("");
//     $("#precioMarroc").html("");
//     for (var i = 0; i<carrito2.compraEnCarrito.length; i++){
//         if (carrito2.compraEnCarrito[i].tipoProducto == "M") {
//             console.log(prueba.compraEnCarrito);
//             $("#total").html(precioTotal - carrito2.compraEnCarrito[i].precio);
//             console.log(prueba.compraEnCarrito.splice(i,1));
//             localStorage.setItem (('carrito'), JSON.stringify (prueba));
//         }
//     }
// })
// /*Eliminar Bombón con Nutella*/
// $(document).on('click', '#eliminarNutella', function() {
//     $("#cantidadNutella").html("");
//     $("#precioNutella").html("");
//     for (var i = 0; i<carrito2.compraEnCarrito.length; i++){
//         if (carrito2.compraEnCarrito[i].tipoProducto == "N") {
//             console.log(prueba.compraEnCarrito);
//             $("#total").html(precioTotal - carrito2.compraEnCarrito[i].precio);
//             console.log(prueba.compraEnCarrito.splice(i,1));
//             localStorage.setItem (('carrito'), JSON.stringify (prueba));
//         }
//     }
// })
// /*Inicio Eliminar del carrito un producto*/
